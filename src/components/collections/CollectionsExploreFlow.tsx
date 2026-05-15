"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { CollectionsApiService } from "@/clients/collections";
import type { Collection, TravelerType } from "@/clients/collections";
import type { FamilyRoom } from "@/components/trip-planning/familyTypes";
import { CollectionsBrowseList } from "@/components/collections/CollectionsBrowseList";
import { CollectionHeroBlock } from "@/components/collections/CollectionHeroBlock";
import CollectionAccommodationsSection from "@/components/accommodation/CollectionAccommodationsSection";
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
import { AppMultiStepFlowShell } from "@/components/app/AppMultiStepFlowShell";

type Step = 1 | 2 | 3 | 4;

type StayPick = { uniqueName: string; startDate: string; endDate: string };

type PendingTripPayload = {
  accommodationUniqueName: string;
  searchTransactionId: string;
  startDate: string;
  endDate: string;
  travelerType: TravelerType;
  roomId: string;
  rate: PublicAccommodationRoomRate;
};

const STEPPER = ["Coleções", "Coleção", "Hospedagem", "Finalizar"] as const;
const DEFAULT_FAMILY_ROOMS: FamilyRoom[] = [{ adults: 2, children: 0, childrenAges: [] }];

function asAvailabilityQuery(travelerType: TravelerType): AccommodationAvailabilityQuery {
  const adults = 2;
  const children = 0;
  const childrenAges: number[] = [];
  const rooms = [{ adults, children, childrenAges }];
  return {
    travelerInput: {
      type: travelerType,
      adults,
      children,
      childrenAges,
      rooms,
    },
  };
}

function parseYmd(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function CollectionsExploreFlow() {
  const router = useRouter();
  const travelerId = useAppStore((s) => s.travelerState?.id);

  const [step, setStep] = useState<Step>(1);
  const [collectionUniqueName, setCollectionUniqueName] = useState<string | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [stayPick, setStayPick] = useState<StayPick | null>(null);
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

  const quotedStayRooms = useMemo(() => quote?.rooms ?? [], [quote]);
  const progress = useMemo(() => ((step - 1) / 3) * 100, [step]);

  const headerTitle = useMemo(() => {
    if (step === 1) return "Escolha uma coleção";
    if (step === 2) return collection?.title ?? "Coleção";
    if (step === 3) return "Sua hospedagem";
    return "Finalizando";
  }, [step, collection?.title]);

  useEffect(() => {
    if (step !== 2 || !collectionUniqueName) return;
    let cancelled = false;
    setCollectionLoading(true);
    CollectionsApiService.getCollectionByUniqueName(collectionUniqueName)
      .then((data) => {
        if (!cancelled) setCollection(data);
      })
      .catch(() => {
        if (!cancelled) setCollection(null);
      })
      .finally(() => {
        if (!cancelled) setCollectionLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [step, collectionUniqueName]);

  useEffect(() => {
    if (step !== 3 || !stayPick || !collection) return;
    let cancelled = false;
    setQuoteLoading(true);
    setQuoteError(false);
    setQuote(null);
    setSelectedRateIdByRoomId({});

    const start = parseYmd(stayPick.startDate);
    const end = parseYmd(stayPick.endDate);

    AccommodationsApiService.getAccommodationAvailability(
      stayPick.uniqueName,
      start,
      end,
      asAvailabilityQuery(collection.travelerType)
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
  }, [step, stayPick, collection]);

  useEffect(() => {
    if (step !== 3 || !stayPick?.uniqueName) return;
    let cancelled = false;
    setAccommodationDetailLoading(true);
    setAccommodationDetailError(false);
    setAccommodationDetail(null);
    AccommodationsApiService.getAccommodationByUniqueName(stayPick.uniqueName)
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
  }, [step, stayPick?.uniqueName]);

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
      setStayPick(null);
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
      setCollectionUniqueName(null);
      setCollection(null);
      setStep(1);
    }
  }, [step, finalizeLoading]);

  return (
    <AppMultiStepFlowShell
      categoryLabel="Coleções"
      title={headerTitle}
      step={step}
      totalSteps={STEPPER.length}
      stepperLabels={STEPPER}
      progressPercent={progress}
      showBack={step > 1}
      onBack={goBack}
      exitHref="/app"
    >
      {step === 1 ? (
        <CollectionsBrowseList
          compact
          title="Coleções para encontrar sua próxima jornada"
          subtitle="Curadorias prontas para inspirar e facilitar seu planejamento."
          onSelectCollection={(uniqueName) => {
            setCollectionUniqueName(uniqueName);
            setStep(2);
          }}
        />
      ) : null}

      {step === 2 && (collectionLoading || !collection) ? (
        <div className="p-10 flex justify-center">
          <CircleLoader />
        </div>
      ) : null}

      {collection && step > 1 ? (
        <div className={step === 2 ? "flex flex-col min-h-0" : "hidden"} aria-hidden={step !== 2}>
          <CollectionHeroBlock collection={collection} compact />
          <CollectionAccommodationsSection
            collectionUniqueName={collection.uniqueName}
            travelerType={collection.travelerType}
            layout="drawer"
            onAccommodationPick={(p) => {
              setStayPick(p);
              setStep(3);
            }}
          />
        </div>
      ) : null}

      {step === 3 && stayPick && collection ? (
        <div className="space-y-5 pb-8">
          <AccommodationDrawerDetailPanel
            accommodation={accommodationDetail}
            loading={accommodationDetailLoading}
            error={accommodationDetailError}
            fallbackTitle={accommodationDetail?.title ?? null}
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
              if (!quote?.transactionId || !collection) return;
              setPendingTripPayload({
                accommodationUniqueName: stayPick.uniqueName,
                searchTransactionId: quote.transactionId,
                startDate: stayPick.startDate,
                endDate: stayPick.endDate,
                travelerType: collection.travelerType,
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
