"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import type { Destination } from "@/clients/destinations/destinations";
import { DestinationsBrowseList } from "@/components/destinations/DestinationsBrowseList";
import { DestinationStayAvailabilityStep } from "@/components/destinations/DestinationStayAvailabilityStep";
import { AccommodationDrawerDetailPanel } from "@/components/accommodation/AccommodationDrawerDetailPanel";
import { AccommodationAvailabilityRoomsGrid } from "@/components/accommodation/AccommodationAvailabilityRoomsGrid";
import { AccommodationsApiService } from "@/clients/accommodations";
import type { AccommodationAvailabilityQuery } from "@/clients/accommodations";
import type { AvailabilityTravelerType } from "@/clients/accommodations";
import type {
  AccommodationAvailabilityResponse,
  PublicAccommodation,
  PublicAccommodationRoomAvailability,
  PublicAccommodationRoomRate,
} from "@/core/types/accommodations";
import { buildCandidateRatesForRoom } from "@/components/accommodation/roomCandidateRates";
import { useAppStore } from "@/core/store";
import { createTripFromSearchAvailabilityPick } from "@/lib/createTripFromSearchAvailabilityPick";
import { CircleLoader } from "@/components/common/CircleLoader";
import type { FamilyRoom } from "@/components/trip-planning/familyTypes";
import type { TravelerType } from "@/clients/collections";
import { AppMultiStepFlowShell } from "@/components/app/AppMultiStepFlowShell";

type Step = 1 | 2 | 3 | 4;

type PendingTripPayload = {
  accommodationUniqueName: string;
  searchTransactionId: string;
  startDate: string;
  endDate: string;
  travelerType: TravelerType;
  roomId: string;
  rate: PublicAccommodationRoomRate;
};

const DEFAULT_TRAVELER_QUERY: AccommodationAvailabilityQuery = {
  travelerInput: {
    type: "COUPLE",
    adults: 2,
    children: 0,
    childrenAges: [],
    rooms: [{ adults: 2, children: 0, childrenAges: [] }],
  },
};

const DEFAULT_FAMILY_ROOMS: FamilyRoom[] = [{ adults: 2, children: 0, childrenAges: [] }];
const STEPPER = ["Destino", "Hospedagem", "Quarto", "Finalizar"] as const;
const HEADER_TITLES = [
  "Qual o seu próximo destino?",
  "Escolha sua hospedagem",
  "Escolha seu quarto",
  "Finalizando",
] as const;

export function DestinationsExploreFlow() {
  const router = useRouter();
  const travelerId = useAppStore((s) => s.travelerState?.id);

  const [step, setStep] = useState<Step>(1);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [availabilityStartDate, setAvailabilityStartDate] = useState<Date | null>(null);
  const [availabilityEndDate, setAvailabilityEndDate] = useState<Date | null>(null);
  const [selectedAccommodationUniqueName, setSelectedAccommodationUniqueName] = useState<string | null>(null);
  const [selectedAccommodationTitle, setSelectedAccommodationTitle] = useState<string | null>(null);
  const [quote, setQuote] = useState<AccommodationAvailabilityResponse | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState(false);
  const [accommodationDetail, setAccommodationDetail] = useState<PublicAccommodation | null>(null);
  const [accommodationDetailLoading, setAccommodationDetailLoading] = useState(false);
  const [accommodationDetailError, setAccommodationDetailError] = useState(false);
  const [selectedRateIdByRoomId, setSelectedRateIdByRoomId] = useState<Record<string, string>>({});
  const [pendingTripPayload, setPendingTripPayload] = useState<PendingTripPayload | null>(null);
  const [finalizeLoading, setFinalizeLoading] = useState(false);
  const [finalizeError, setFinalizeError] = useState<string | null>(null);
  const finalizeRan = useRef(false);

  const travelerQuery = useMemo(() => DEFAULT_TRAVELER_QUERY, []);
  const quotedStayRooms = useMemo(() => quote?.rooms ?? [], [quote]);
  const progress = useMemo(() => ((step - 1) / 3) * 100, [step]);

  useEffect(() => {
    if (step !== 3 || !selectedAccommodationUniqueName) return;
    if (!availabilityStartDate || !availabilityEndDate) return;

    let cancelled = false;
    setQuoteLoading(true);
    setQuoteError(false);
    setQuote(null);
    setSelectedRateIdByRoomId({});

    AccommodationsApiService.getAccommodationAvailability(
      selectedAccommodationUniqueName,
      availabilityStartDate,
      availabilityEndDate,
      travelerQuery
    )
      .then((res) => {
        if (cancelled) return;
        setQuote(res);
        const rooms = res.rooms ?? [];
        const hasBookableRoom = rooms.some((r) => Array.isArray(r.rates) && r.rates.length > 0);
        if (!hasBookableRoom) setQuoteError(true);
      })
      .catch(() => {
        if (!cancelled) {
          setQuoteError(true);
          setQuote(null);
        }
      })
      .finally(() => {
        if (!cancelled) setQuoteLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [step, selectedAccommodationUniqueName, availabilityStartDate, availabilityEndDate, travelerQuery]);

  useEffect(() => {
    if (step !== 3 || !selectedAccommodationUniqueName) return;
    let cancelled = false;
    setAccommodationDetailLoading(true);
    setAccommodationDetailError(false);
    setAccommodationDetail(null);
    AccommodationsApiService.getAccommodationByUniqueName(selectedAccommodationUniqueName)
      .then((acc) => {
        if (!cancelled) setAccommodationDetail(acc);
      })
      .catch(() => {
        if (!cancelled) {
          setAccommodationDetailError(true);
          setAccommodationDetail(null);
        }
      })
      .finally(() => {
        if (!cancelled) setAccommodationDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [step, selectedAccommodationUniqueName]);

  useEffect(() => {
    if (step !== 3) return;
    const rooms = quotedStayRooms.filter((r) => Array.isArray(r.rates) && r.rates.length > 0);
    if (rooms.length === 0) return;
    setSelectedRateIdByRoomId((prev) => {
      const next = { ...prev };
      for (const room of rooms) {
        if (next[room.id]) continue;
        const candidates = buildCandidateRatesForRoom(room.rates ?? [], null);
        const first = candidates[0];
        if (first?.id) next[room.id] = first.id;
      }
      return next;
    });
  }, [step, quotedStayRooms]);

  useEffect(() => {
    if (step !== 4 || !pendingTripPayload) return;
    const tid = travelerId?.trim();
    if (!tid) return;
    if (finalizeRan.current) return;
    finalizeRan.current = true;

    let cancelled = false;
    setFinalizeLoading(true);
    setFinalizeError(null);

    const payload = pendingTripPayload;

    createTripFromSearchAvailabilityPick({
      travelerId: tid,
      accommodationUniqueName: payload.accommodationUniqueName,
      searchTransactionId: payload.searchTransactionId,
      startDate: payload.startDate,
      endDate: payload.endDate,
      travelerType: payload.travelerType as AvailabilityTravelerType,
      accommodationRoomId: payload.roomId,
      rate: payload.rate,
      familyRooms: payload.travelerType === "FAMILY" ? DEFAULT_FAMILY_ROOMS : undefined,
    })
      .then((tripId) => {
        if (cancelled) return;
        setPendingTripPayload(null);
        router.push(`/app/viagens/${encodeURIComponent(tripId)}/checkout`);
      })
      .catch(() => {
        if (!cancelled) {
          setFinalizeError("Não foi possível criar a viagem. Tente novamente.");
          finalizeRan.current = false;
        }
      })
      .finally(() => {
        if (!cancelled) setFinalizeLoading(false);
      });

    return () => {
      cancelled = true;
      finalizeRan.current = false;
    };
  }, [step, pendingTripPayload, travelerId, router]);

  const goBack = useCallback(() => {
    if (step === 4) {
      if (finalizeLoading) return;
      setFinalizeError(null);
      finalizeRan.current = false;
      setPendingTripPayload(null);
      setStep(3);
      return;
    }
    if (step === 3) {
      setSelectedAccommodationUniqueName(null);
      setSelectedAccommodationTitle(null);
      setQuote(null);
      setQuoteError(false);
      setAccommodationDetail(null);
      setAccommodationDetailLoading(false);
      setAccommodationDetailError(false);
      setSelectedRateIdByRoomId({});
      setStep(2);
      return;
    }
    if (step === 2) {
      setSelectedDestination(null);
      setAvailabilityStartDate(null);
      setAvailabilityEndDate(null);
      setStep(1);
    }
  }, [step, finalizeLoading]);

  return (
    <AppMultiStepFlowShell
      categoryLabel="Explorar destinos"
      title={HEADER_TITLES[step - 1]}
      step={step}
      totalSteps={STEPPER.length}
      stepperLabels={STEPPER}
      progressPercent={progress}
      showBack={step > 1}
      onBack={goBack}
      exitHref="/app"
    >
      {step === 1 ? (
        <DestinationsBrowseList
          onSelectDestination={(d) => {
            setSelectedDestination(d);
            setAvailabilityStartDate(null);
            setAvailabilityEndDate(null);
            setStep(2);
          }}
          compact
        />
      ) : null}

      {step === 2 && selectedDestination ? (
        <DestinationStayAvailabilityStep
          destination={selectedDestination}
          travelerQuery={travelerQuery}
          startDate={availabilityStartDate}
          endDate={availabilityEndDate}
          onDateRangeChange={(u) => {
            setAvailabilityStartDate(u[0]);
            setAvailabilityEndDate(u[1]);
          }}
          onSelectAccommodation={(uniqueName, title) => {
            setSelectedAccommodationUniqueName(uniqueName);
            setSelectedAccommodationTitle(title);
            setStep(3);
          }}
          compact
        />
      ) : null}

      {step === 3 && selectedAccommodationUniqueName && availabilityStartDate && availabilityEndDate ? (
        <div className="space-y-5 p-4 pb-8">
          <AccommodationDrawerDetailPanel
            accommodation={accommodationDetail}
            loading={accommodationDetailLoading}
            error={accommodationDetailError}
            fallbackTitle={selectedAccommodationTitle ?? accommodationDetail?.title ?? null}
          />
          <AccommodationAvailabilityRoomsGrid
            availabilityLoading={quoteLoading}
            availabilityError={quoteError}
            rooms={quotedStayRooms}
            selectedRateIdByRoomId={selectedRateIdByRoomId}
            onSelectedRateIdChange={(roomId, rateId) =>
              setSelectedRateIdByRoomId((prev) => ({ ...prev, [roomId]: rateId }))
            }
            transactionId={quote?.transactionId ?? null}
            actionLabel="Selecionar este quarto"
            onRoomAction={(room: PublicAccommodationRoomAvailability, rate: PublicAccommodationRoomRate) => {
              if (!quote?.transactionId || !availabilityStartDate || !availabilityEndDate) return;
              setPendingTripPayload({
                accommodationUniqueName: selectedAccommodationUniqueName,
                searchTransactionId: quote.transactionId,
                startDate: format(availabilityStartDate, "yyyy-MM-dd"),
                endDate: format(availabilityEndDate, "yyyy-MM-dd"),
                travelerType: "COUPLE",
                roomId: room.id,
                rate,
              });
              setStep(4);
            }}
          />
        </div>
      ) : null}

      {step === 4 ? (
        <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 min-h-[40vh]">
          {finalizeError ? (
            <p className="text-center text-red-700 font-comfortaa text-sm max-w-md">{finalizeError}</p>
          ) : !travelerId ? (
            <>
              <CircleLoader />
              <div className="text-center space-y-2 max-w-md">
                <p className="text-xs font-medium uppercase tracking-wide text-primary-700">Aguarde</p>
                <h3 className="font-baloo text-lg font-bold text-secondary-900">Carregando seu perfil</h3>
                <p className="font-comfortaa text-sm text-secondary-600">
                  Precisamos do seu perfil de viajante para criar a viagem. Isso costuma levar só alguns segundos.
                </p>
              </div>
            </>
          ) : (
            <>
              <CircleLoader />
              <div className="text-center space-y-2 max-w-md">
                <p className="text-xs font-medium uppercase tracking-wide text-primary-700">Criando sua viagem</p>
                <h3 className="font-baloo text-lg font-bold text-secondary-900">Quase lá</h3>
                <p className="font-comfortaa text-sm text-secondary-600">
                  Estamos criando sua viagem e em seguida você será levado ao checkout.
                </p>
              </div>
            </>
          )}
        </div>
      ) : null}
    </AppMultiStepFlowShell>
  );
}
