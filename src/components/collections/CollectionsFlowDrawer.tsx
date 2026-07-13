"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

/** Matches `CollectionAccommodationsSection` batch quote: one room, 2 adults (casal or família placeholder). */
const DEFAULT_FAMILY_ROOMS: FamilyRoom[] = [{ adults: 2, children: 0, childrenAges: [] }];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const STEPPER = ["Coleções", "Coleção", "Hospedagem", "Finalizar"] as const;

export function CollectionsFlowDrawer({ isOpen, onClose }: Props) {
  const router = useRouter();
  const travelerId = useAppStore((s) => s.travelerState?.id);

  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setCollectionUniqueName(null);
    setCollection(null);
    setCollectionLoading(false);
    setStayPick(null);
    setQuote(null);
    setQuoteLoading(false);
    setQuoteError(false);
    setAccommodationDetail(null);
    setAccommodationDetailLoading(false);
    setAccommodationDetailError(false);
    setSelectedRateIdByRoomId({});
    setPendingTripPayload(null);
    setFinalizeLoading(false);
    setFinalizeError(null);
    finalizeRan.current = false;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (!isOpen || step !== 2 || !collectionUniqueName) return;
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
  }, [isOpen, step, collectionUniqueName]);

  useEffect(() => {
    if (!isOpen || step !== 3 || !stayPick || !collection) return;
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
  }, [isOpen, step, stayPick, collection]);

  useEffect(() => {
    if (!isOpen || step !== 3 || !stayPick?.uniqueName) return;
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
  }, [isOpen, step, stayPick?.uniqueName]);

  useEffect(() => {
    if (!isOpen || step !== 3) return;
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
  }, [isOpen, step, quotedStayRooms]);

  useEffect(() => {
    if (!isOpen || step !== 4 || !pendingTripPayload) return;
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
        onClose();
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
  }, [isOpen, step, pendingTripPayload, travelerId, onClose, router]);

  const goBack = () => {
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
      return;
    }
  };

  const progress = useMemo(() => ((step - 1) / 3) * 100, [step]);

  const headerTitle = useMemo(() => {
    if (step === 1) return "Escolha uma coleção";
    if (step === 2) return collection?.title ?? "Coleção";
    if (step === 3) return "Sua hospedagem";
    return "Finalizando";
  }, [step, collection?.title]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        <header className="shrink-0 border-b border-secondary-200 p-5">
          <div className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
            <div className="min-w-[96px]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                >
                  {"< Voltar"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                >
                  Fechar
                </button>
              )}
            </div>
            <div className="min-w-0 text-center">
              <p className="font-comfortaa text-xs text-secondary-500">Coleções</p>
              <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">{headerTitle}</h2>
              <p className="font-comfortaa text-xs text-secondary-500 mt-1">
                Passo {step} de {STEPPER.length}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 inline-flex items-center justify-center shrink-0"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-5 flex justify-between gap-2">
            {STEPPER.map((name, i) => {
              const s = (i + 1) as Step;
              const isActive = s === step;
              const isCompleted = s < step;
              return (
                <div
                  key={name}
                  className={`flex flex-col items-center flex-1 min-w-0 ${
                    isActive ? "text-secondary-900" : isCompleted ? "text-secondary-600" : "text-secondary-400"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-baloo font-semibold shrink-0 mb-1 ${
                      isActive
                        ? "bg-accent-500 text-secondary-900"
                        : isCompleted
                          ? "bg-accent-400/80 text-secondary-900"
                          : "bg-secondary-200 text-secondary-500"
                    }`}
                  >
                    {isCompleted ? "✓" : s}
                  </span>
                  <span className="font-comfortaa text-[10px] md:text-xs text-center truncate w-full">{name}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 h-2 bg-secondary-200 rounded-full overflow-hidden">
            <div className="h-full bg-accent-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
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
                  if (!p.startDate || !p.endDate) return;
                  setStayPick({
                    uniqueName: p.uniqueName,
                    startDate: p.startDate,
                    endDate: p.endDate,
                  });
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
        </div>
      </aside>
    </div>,
    document.body
  );
}
