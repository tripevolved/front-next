"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DestinationCard from "@/components/destinations/DestinationCard";
import { DestinationsApiService } from "@/clients/destinations";
import type { Destination } from "@/clients/destinations/destinations";
import { SuggestDestinationForCuratorship } from "@/components/destinations/SuggestDestinationForCuratorship";
import { AccommodationsApiService } from "@/clients/accommodations";
import type { AccommodationByDestinationAvailabilityResponse } from "@/clients/accommodations/by-destination-availability";
import DateRangeSelector from "@/components/common/DateRangeSelector";
import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";
import { RoomAvailabilityPrice } from "@/components/accommodation/RoomAvailabilityPrice";
import type { PublicAccommodationRoomRate } from "@/core/types/accommodations";
import type { AccommodationAvailabilityQuery } from "@/clients/accommodations/availability";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TripsApiService } from "@/clients/trips";
import { toDateOnlyString } from "@/clients/accommodations";
import type { PublicAccommodationRoomAvailability } from "@/core/types/accommodations";
import type { PublicAccommodation } from "@/core/types/accommodations";
import { PaymentsApiService } from "@/clients/payments";
import type { CheckoutPaymentItem } from "@/core/types/payments";
import { buildCandidateRatesForRoom } from "@/components/accommodation/roomCandidateRates";
import { AccommodationDrawerDetailPanel } from "@/components/accommodation/AccommodationDrawerDetailPanel";
import { AccommodationAvailabilityRoomsGrid } from "@/components/accommodation/AccommodationAvailabilityRoomsGrid";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  relatedDestinationUniqueName?: string | null;
  /** Trip destination label — prefills the search field when the drawer opens. */
  tripDestinationLabel?: string | null;
  /** When set with trip stay dates, opens on step 2 and loads availability immediately. */
  presetDestinationUniqueName?: string | null;
  presetStayStartDate?: Date | null;
  presetStayEndDate?: Date | null;
  travelerQuery: AccommodationAvailabilityQuery;
  tripId: string;
  onTripAccommodationsChanged?: () => void | Promise<void>;
};

type Step = 1 | 2 | 3 | 4;

function imageUrl(img?: { url: string } | null): string | null {
  const u = img?.url?.trim();
  return u ? u : null;
}

function asDate(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "string" && value.trim() !== "") {
    const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) {
      const y = Number(m[1]);
      const mo = Number(m[2]);
      const d = Number(m[3]);
      const local = new Date(y, mo - 1, d);
      return Number.isNaN(local.getTime()) ? null : local;
    }
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function getAmenityIconPath(iconName: string | undefined): string | null {
  if (!iconName) return null;
  return `/assets/amenities/${iconName}.svg`;
}

function pickFirstRate(rooms: any[]): PublicAccommodationRoomRate | null {
  for (const r of rooms) {
    const rates = (r as any)?.rates;
    if (Array.isArray(rates) && rates.length > 0 && rates[0]) return rates[0] as PublicAccommodationRoomRate;
  }
  return null;
}

export function AddAccommodationDrawer({
  isOpen,
  onClose,
  relatedDestinationUniqueName,
  tripDestinationLabel,
  presetDestinationUniqueName,
  presetStayStartDate,
  presetStayEndDate,
  travelerQuery,
  tripId,
  onTripAccommodationsChanged,
}: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [presetInitializing, setPresetInitializing] = useState(false);
  const preserveDatesOnDestinationRef = useRef(false);
  const totalSteps = 4;
  const stepperNames = useMemo(() => ["Destino", "Hospedagem", "Quarto", "Finalizar"] as const, []);
  const headerTitles = useMemo(
    () =>
      [
        "Qual o seu próximo destino nessa jornada?",
        "Escolha sua hospedagem",
        "Escolha seu quarto",
        "Próximos passos",
      ] as const,
    []
  );
  const progress = useMemo(() => {
    const denominator = Math.max(1, totalSteps - 1);
    return ((step - 1) / denominator) * 100;
  }, [step]);

  const goBack = () => {
    if (step === 4) {
      setCheckoutPaymentError(null);
      setCreatingCheckoutPayment(false);
    }
    setStep(Math.max(1, step - 1) as Step);
  };

  // Curated destinations (related)
  const [relatedDestinations, setRelatedDestinations] = useState<Destination[] | null>(null);

  // Search
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Destination[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Step 2 availability (by destination)
  const [availability, setAvailability] = useState<AccommodationByDestinationAvailabilityResponse | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);
  const [availabilityStartDate, setAvailabilityStartDate] = useState<Date | null>(null);
  const [availabilityEndDate, setAvailabilityEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const handleAvailabilityDateRangeChange = (update: [Date | null, Date | null]) => {
    setAvailabilityStartDate(update[0]);
    setAvailabilityEndDate(update[1]);
    if (update[0] && update[1]) setIsCalendarOpen(false);
  };

  // Step 3: availability by accommodation (rooms + transaction)
  const [selectedAccommodationUniqueName, setSelectedAccommodationUniqueName] = useState<string | null>(null);
  const [selectedAccommodationTitle, setSelectedAccommodationTitle] = useState<string | null>(null);
  const [step3AvailabilityLoading, setStep3AvailabilityLoading] = useState(false);
  const [step3AvailabilityError, setStep3AvailabilityError] = useState(false);
  const [step3TransactionId, setStep3TransactionId] = useState<string | null>(null);
  const [step3ValidUntil, setStep3ValidUntil] = useState<Date | null>(null);
  const [step3Rooms, setStep3Rooms] = useState<any[]>([]);
  const [creatingTripAccommodation, setCreatingTripAccommodation] = useState(false);
  const [createTripAccommodationError, setCreateTripAccommodationError] = useState<string | null>(null);
  const [createdTripAccommodationId, setCreatedTripAccommodationId] = useState<string | null>(null);
  const [creatingCheckoutPayment, setCreatingCheckoutPayment] = useState(false);
  const [checkoutPaymentError, setCheckoutPaymentError] = useState<string | null>(null);
  const [step3Accommodation, setStep3Accommodation] = useState<PublicAccommodation | null>(null);
  const [step3AccommodationLoading, setStep3AccommodationLoading] = useState(false);
  const [step3AccommodationError, setStep3AccommodationError] = useState(false);
  const [step3SelectedRateIdByRoomId, setStep3SelectedRateIdByRoomId] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  const formatDateRange = () => {
    if (!availabilityStartDate && !availabilityEndDate) return "Selecione as datas";
    if (availabilityStartDate && !availabilityEndDate) {
      return format(availabilityStartDate, "dd/MM/yyyy", { locale: ptBR });
    }
    if (availabilityStartDate && availabilityEndDate) {
      return `${format(availabilityStartDate, "dd/MM/yyyy", { locale: ptBR })} - ${format(
        availabilityEndDate,
        "dd/MM/yyyy",
        { locale: ptBR }
      )}`;
    }
    return "Selecione as datas";
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const resetFlowState = () => {
      setSearch((tripDestinationLabel ?? "").trim());
      setSearchResults(null);
      setSearchLoading(false);
      setAvailability(null);
      setAvailabilityLoading(false);
      setAvailabilityError(false);
      setSelectedAccommodationUniqueName(null);
      setSelectedAccommodationTitle(null);
      setStep3AvailabilityLoading(false);
      setStep3AvailabilityError(false);
      setStep3TransactionId(null);
      setStep3ValidUntil(null);
      setStep3Rooms([]);
      setCreatingTripAccommodation(false);
      setCreateTripAccommodationError(null);
      setCreatedTripAccommodationId(null);
      setCreatingCheckoutPayment(false);
      setCheckoutPaymentError(null);
      setStep3Accommodation(null);
      setStep3AccommodationLoading(false);
      setStep3AccommodationError(false);
      setStep3SelectedRateIdByRoomId({});
    };

    const unique = presetDestinationUniqueName?.trim() ?? "";
    const start = presetStayStartDate ?? null;
    const end = presetStayEndDate ?? null;
    const canSkipToAccommodations = Boolean(unique && start && end);

    resetFlowState();

    if (!canSkipToAccommodations) {
      setPresetInitializing(false);
      setStep(1);
      setSelectedDestination(null);
      setAvailabilityStartDate(null);
      setAvailabilityEndDate(null);
      return;
    }

    setPresetInitializing(true);
    setAvailabilityStartDate(start);
    setAvailabilityEndDate(end);
    preserveDatesOnDestinationRef.current = true;

    DestinationsApiService.getDestinationByUniqueName(unique)
      .then((pub) => {
        if (cancelled) return;
        const coverUrl = pub.photos?.[0]?.url?.trim() || "/assets/blank-image.png";
        setSelectedDestination({
          uniqueName: pub.uniqueName,
          name: pub.title,
          destinationId: pub.id,
          coverImage: { url: coverUrl },
          travelerProfile: pub.travelerProfiles?.[0] ?? null,
        });
        setStep(2);
      })
      .catch(() => {
        if (cancelled) return;
        setStep(1);
        setSelectedDestination(null);
        setAvailabilityStartDate(null);
        setAvailabilityEndDate(null);
      })
      .finally(() => {
        if (!cancelled) setPresetInitializing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    isOpen,
    tripDestinationLabel,
    presetDestinationUniqueName,
    presetStayStartDate,
    presetStayEndDate,
  ]);

  useEffect(() => {
    if (!isOpen) return;
    if (!relatedDestinationUniqueName) {
      setRelatedDestinations(null);
      return;
    }

    let cancelled = false;
    DestinationsApiService.getDestinations({
      profile: "all",
      relatedDestination: relatedDestinationUniqueName,
      page: 1,
      limit: 6,
    })
      .then((res) => {
        if (cancelled) return;
        const items = res?.destinations;
        setRelatedDestinations(Array.isArray(items) && items.length > 0 ? items : null);
      })
      .catch(() => {
        if (!cancelled) setRelatedDestinations(null);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, relatedDestinationUniqueName]);

  useEffect(() => {
    if (!isOpen) return;
    if (preserveDatesOnDestinationRef.current) {
      preserveDatesOnDestinationRef.current = false;
      return;
    }
    setAvailability(null);
    setAvailabilityLoading(false);
    setAvailabilityError(false);
    setAvailabilityStartDate(null);
    setAvailabilityEndDate(null);
  }, [isOpen, selectedDestination?.uniqueName]);

  const debouncedSearch = useMemo(() => search.trim(), [search]);

  const hasSearchGridHits = Boolean(searchResults?.length);
  const showSearchEmptyState = Boolean(debouncedSearch) && !searchLoading && !hasSearchGridHits;

  useEffect(() => {
    if (!isOpen) return;
    const q = debouncedSearch;
    if (!q) {
      setSearchResults(null);
      setSearchLoading(false);
      return;
    }

    let cancelled = false;
    setSearchLoading(true);
    DestinationsApiService.getDestinations({
      profile: "all",
      page: 1,
      limit: 6,
      search: q,
    })
      .then((res) => {
        if (cancelled) return;
        const items = res?.destinations;
        setSearchResults(Array.isArray(items) && items.length > 0 ? items : null);
      })
      .catch(() => {
        if (!cancelled) setSearchResults(null);
      })
      .finally(() => {
        if (!cancelled) setSearchLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, debouncedSearch]);

  useEffect(() => {
    if (!isOpen) return;
    if (step !== 2) return;
    const destinationUniqueName = selectedDestination?.uniqueName;
    if (!destinationUniqueName) return;
    if (!availabilityStartDate || !availabilityEndDate) {
      setAvailability(null);
      setAvailabilityLoading(false);
      setAvailabilityError(false);
      return;
    }

    let cancelled = false;
    setAvailabilityLoading(true);
    setAvailability(null);
    setAvailabilityError(false);
    AccommodationsApiService.getAccommodationAvailabilityByDestination(
      destinationUniqueName,
      availabilityStartDate,
      availabilityEndDate,
      travelerQuery
    )
      .then((res) => {
        if (cancelled) return;
        const accs = (res as any)?.accommodations;
        if (!Array.isArray(accs) || accs.length === 0) {
          setAvailability(null);
        } else {
          setAvailability(res);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAvailability(null);
          setAvailabilityError(true);
        }
      })
      .finally(() => {
        if (!cancelled) setAvailabilityLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, step, selectedDestination?.uniqueName, availabilityStartDate, availabilityEndDate, travelerQuery]);

  useEffect(() => {
    if (!isOpen) return;
    if (step !== 3) return;
    if (!selectedAccommodationUniqueName) return;
    if (!availabilityStartDate || !availabilityEndDate) return;

    let cancelled = false;
    setStep3AvailabilityLoading(true);
    setStep3AvailabilityError(false);
    setStep3TransactionId(null);
    setStep3ValidUntil(null);
    setStep3SelectedRateIdByRoomId({});
    setStep3Rooms([]);

    AccommodationsApiService.getAccommodationAvailability(
      selectedAccommodationUniqueName,
      availabilityStartDate,
      availabilityEndDate,
      travelerQuery
    )
      .then((res) => {
        if (cancelled) return;
        setStep3TransactionId(res.transactionId);
        setStep3ValidUntil(res.uniqueTransactionValidUntil ?? null);
        setStep3Rooms(res.rooms ?? []);
      })
      .catch(() => {
        if (cancelled) return;
        setStep3AvailabilityError(true);
        setStep3Rooms([]);
      })
      .finally(() => {
        if (cancelled) return;
        setStep3AvailabilityLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, step, selectedAccommodationUniqueName, availabilityStartDate, availabilityEndDate, travelerQuery]);

  useEffect(() => {
    if (!isOpen) return;
    if (step !== 3) return;

    const rooms = (step3Rooms as PublicAccommodationRoomAvailability[]).filter((r) => Array.isArray(r.rates) && r.rates.length > 0);
    if (rooms.length === 0) return;

    setStep3SelectedRateIdByRoomId((prev) => {
      const next: Record<string, string> = { ...prev };
      for (const room of rooms) {
        if (next[room.id]) continue;
        const candidates = buildCandidateRatesForRoom(room.rates, null);
        const first = candidates[0];
        if (first?.id) next[room.id] = first.id;
      }
      return next;
    });
  }, [isOpen, step, step3Rooms]);

  useEffect(() => {
    if (!isOpen) return;
    if (step !== 3) return;
    if (!selectedAccommodationUniqueName) return;

    let cancelled = false;
    setStep3AccommodationLoading(true);
    setStep3AccommodationError(false);
    setStep3Accommodation(null);

    AccommodationsApiService.getAccommodationByUniqueName(selectedAccommodationUniqueName)
      .then((acc) => {
        if (cancelled) return;
        setStep3Accommodation(acc);
      })
      .catch(() => {
        if (cancelled) return;
        setStep3AccommodationError(true);
        setStep3Accommodation(null);
      })
      .finally(() => {
        if (cancelled) return;
        setStep3AccommodationLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, step, selectedAccommodationUniqueName]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        <header className="shrink-0 border-b border-secondary-200 p-5">
          <div className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
            <div className="min-w-[96px]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900 transition-colors"
                >
                  {"< Voltar"}
                </button>
              ) : null}
            </div>

            <div className="min-w-0 text-center">
              <p className="font-comfortaa text-xs text-secondary-500">Adicionar hospedagem</p>
              <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">{headerTitles[step - 1]}</h2>
              <p className="font-comfortaa text-xs text-secondary-500 mt-1">
                Passo {step} de {totalSteps}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 transition-colors inline-flex items-center justify-center shrink-0"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-5">
            <div className="flex justify-between gap-2">
              {stepperNames.map((name, i) => {
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
                    <span className="font-comfortaa text-xs md:text-sm text-center truncate w-full">{name}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 h-2 bg-secondary-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={step}
                aria-valuemin={1}
                aria-valuemax={totalSteps}
                aria-label={`Passo ${step} de ${totalSteps}`}
              />
            </div>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto space-y-8">
          {step === 1 ? (
            <div className="p-5">
              {relatedDestinations ? (
                <section className="space-y-4">
                  <h3 className="font-baloo text-lg font-bold text-secondary-900">Nossas sugestões</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedDestinations.map((d) => (
                      <DestinationCard
                        key={d.uniqueName}
                        title={d.name}
                        image={d.coverImage?.url}
                        profile={d.travelerProfile ?? null}
                        link="#"
                        onClick={() => {
                          setSelectedDestination(d);
                          setStep(2);
                        }}
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="space-y-4">
                <h3 className="font-baloo text-lg font-bold text-secondary-900">Buscar destino</h3>
                <div className="relative">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Digite um destino..."
                    className="w-full rounded-xl border border-secondary-200 px-4 py-3 font-comfortaa text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {searchLoading ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
                    </div>
                  ) : null}
                </div>

                {hasSearchGridHits ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(searchResults ?? []).map((d) => (
                      <DestinationCard
                        key={d.uniqueName}
                        title={d.name}
                        image={d.coverImage?.url}
                        profile={d.travelerProfile ?? null}
                        link="#"
                        onClick={() => {
                          setSelectedDestination(d);
                          setStep(2);
                        }}
                      />
                    ))}
                  </div>
                ) : showSearchEmptyState ? (
                  <div className="space-y-4">
                    <p className="font-comfortaa text-sm text-secondary-600">Nenhum destino encontrado.</p>
                    <SuggestDestinationForCuratorship
                      destinationQuery={debouncedSearch}
                      anonymousContactMode="inline"
                      compact
                    />
                  </div>
                ) : null}
              </section>
            </div>
          ) : step === 2 ? (
            <div className="space-y-5 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-comfortaa text-xs text-secondary-500">Destino</p>
                  <p className="font-baloo text-lg font-bold text-secondary-900 truncate">
                    {selectedDestination?.name ?? "—"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative" ref={dateRangeRef}>
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen((v) => !v)}
                    className="w-full text-left rounded-xl border border-secondary-200 bg-white px-4 py-3 pr-10 font-comfortaa text-sm text-secondary-800 hover:bg-secondary-50 transition-colors"
                  >
                    {formatDateRange()}
                  </button>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-secondary-400"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>

                  {isCalendarOpen ? (
                    <div className="absolute z-50 mt-2 bg-white rounded-2xl shadow-xl border border-secondary-200 p-4 left-0">
                      <DateRangeSelector
                        startDate={availabilityStartDate}
                        endDate={availabilityEndDate}
                        onDateRangeChange={handleAvailabilityDateRangeChange}
                        minDate={new Date()}
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              {presetInitializing ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
                  <p className="font-comfortaa text-sm text-secondary-600">Preparando hospedagens para sua viagem…</p>
                </div>
              ) : !availabilityStartDate || !availabilityEndDate ? (
                <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-5">
                  <p className="font-comfortaa text-sm text-secondary-600">
                    Selecione as datas para buscarmos as hospedagens disponíveis.
                  </p>
                </div>
              ) : availabilityError ? (
                <EmptyOrErrorState
                  status="error"
                  title="Não foi possível buscar disponibilidade"
                  description="Tente novamente em alguns instantes."
                />
              ) : availabilityLoading ? (
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-2xl border border-secondary-200 bg-white overflow-hidden animate-pulse">
                      <div className="md:grid" style={{ gridTemplateColumns: "45% 55%" }}>
                        <div className="h-44 md:h-52 bg-secondary-100" />
                        <div className="p-5 space-y-3">
                          <div className="h-5 w-2/3 bg-secondary-100 rounded" />
                          <div className="flex gap-2">
                            <div className="h-6 w-20 bg-secondary-100 rounded-full" />
                            <div className="h-6 w-24 bg-secondary-100 rounded-full" />
                          </div>
                          <div className="h-28 bg-secondary-100 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : availability?.accommodations ? (
                <div className="space-y-4">
                  {(() => {
                    const accs = availability.accommodations.map((a) => ({
                      a,
                      firstRate: pickFirstRate(a.rooms),
                    }));
                    const withRate = accs.filter((x) => x.firstRate != null);
                    const withoutRate = accs.filter((x) => x.firstRate == null);
                    const ordered = [...withRate, ...withoutRate];

                    return ordered.map(({ a, firstRate }) => {
                      const cover = imageUrl(a.coverImage) ?? "/assets/blank-image.png";
                      const tags = (a.tags ?? []).filter(Boolean).slice(0, 6);
                      const recommendedFor = (a.recommendedFor ?? []).filter(Boolean).slice(0, 6);
                      const amenities = (a.amenities ?? []).slice(0, 6);
                      const disabled = !firstRate;

                      return (
                        <button
                          key={a.uniqueName}
                          type="button"
                          disabled={disabled}
                          onClick={() => {
                            if (disabled) return;
                            setSelectedAccommodationUniqueName(a.uniqueName);
                            setSelectedAccommodationTitle(a.title);
                            setStep(3);
                          }}
                          className={[
                            "w-full text-left rounded-2xl border border-secondary-200 bg-white shadow-sm overflow-hidden transition-shadow",
                            disabled ? "opacity-60 grayscale cursor-not-allowed" : "hover:shadow-md",
                          ].join(" ")}
                        >
                          <div className="md:grid" style={{ gridTemplateColumns: "45% 55%" }}>
                            <div className="relative w-full h-44 md:h-full bg-secondary-100">
                              <Image
                                src={cover}
                                alt={a.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 45vw"
                              />
                            </div>

                            <div className="p-5 md:p-6 space-y-3 min-w-0">
                              <div className="min-w-0">
                                <p className="font-baloo text-lg md:text-xl font-bold text-secondary-900">
                                  {a.title}
                                </p>
                                {disabled ? (
                                  <p className="font-comfortaa text-xs text-secondary-500 mt-1">
                                    Sem disponibilidade para as datas selecionadas
                                  </p>
                                ) : null}
                              </div>

                              {(tags.length > 0 || recommendedFor.length > 0) && (
                                <div className="flex flex-wrap gap-2">
                                  {tags.map((t, i) => (
                                    <span
                                      key={`tag:${a.uniqueName}:${i}`}
                                      className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                  {recommendedFor.map((t, i) => (
                                    <span
                                      key={`rec:${a.uniqueName}:${i}`}
                                      className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {amenities.length > 0 ? (
                                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                                  {amenities.map((am, i) => {
                                    const icon = getAmenityIconPath((am as any)?.icon);
                                    return (
                                      <div key={i} className="flex min-w-0 items-center gap-2">
                                        {icon ? (
                                          <Image src={icon} alt="" width={18} height={18} className="shrink-0" />
                                        ) : null}
                                        <span className="font-comfortaa text-xs text-secondary-700 truncate">
                                          {am.title}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : null}

                              {firstRate ? (
                                <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
                                  <RoomAvailabilityPrice rate={firstRate} size="card" />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      );
                    });
                  })()}
                </div>
              ) : (
                <EmptyOrErrorState
                  status="empty"
                  title="Nenhuma hospedagem disponível"
                  description="Tente ajustar as datas para ver outras opções."
                />
              )}

            </div>
          ) : step === 3 ? (
            <div className="space-y-5">
              <AccommodationDrawerDetailPanel
                accommodation={step3Accommodation}
                loading={step3AccommodationLoading}
                error={step3AccommodationError}
                fallbackTitle={selectedAccommodationTitle}
              />

              {!selectedAccommodationUniqueName || !availabilityStartDate || !availabilityEndDate ? (
                <EmptyOrErrorState
                  status="error"
                  title="Não foi possível carregar os quartos"
                  description="Volte e selecione uma hospedagem e datas."
                />
              ) : (
                <AccommodationAvailabilityRoomsGrid
                  availabilityLoading={step3AvailabilityLoading}
                  availabilityError={step3AvailabilityError}
                  rooms={(step3Rooms as PublicAccommodationRoomAvailability[]) ?? []}
                  selectedRateIdByRoomId={step3SelectedRateIdByRoomId}
                  onSelectedRateIdChange={(roomId, rateId) =>
                    setStep3SelectedRateIdByRoomId((prev) => ({ ...prev, [roomId]: rateId }))
                  }
                  transactionId={step3TransactionId}
                  actionLabel="Selecionar este quarto"
                  isActionLoading={creatingTripAccommodation}
                  actionError={createTripAccommodationError}
                  onRoomAction={async (room, selectedRate) => {
                    if (!selectedAccommodationUniqueName) return;
                    if (!step3TransactionId) {
                      setCreateTripAccommodationError("Transação de disponibilidade inválida. Refaça a busca.");
                      return;
                    }

                    setCreatingTripAccommodation(true);
                    setCreateTripAccommodationError(null);
                    try {
                      const firstTravelerRoom = travelerQuery.travelerInput.rooms?.[0];
                      const adults = firstTravelerRoom?.adults ?? travelerQuery.travelerInput.adults ?? 2;
                      const children = firstTravelerRoom?.children ?? travelerQuery.travelerInput.children ?? 0;
                      const childrenAges =
                        firstTravelerRoom?.childrenAges ?? travelerQuery.travelerInput.childrenAges ?? [];

                      const created = await TripsApiService.postTripAccommodationCreate(tripId, {
                        travelerType: travelerQuery.travelerInput.type,
                        accommodationUniqueName: selectedAccommodationUniqueName,
                        uniqueTransactionId: step3TransactionId,
                        uniqueTransactionValidUntil: step3ValidUntil,
                        startDate: toDateOnlyString(availabilityStartDate),
                        endDate: toDateOnlyString(availabilityEndDate),
                        rooms: [
                          {
                            adults,
                            children,
                            childrenAges,
                            rateId: selectedRate.id,
                            accommodationRoomId: room.id,
                            vendor: selectedRate.vendor,
                          },
                        ],
                      });

                      if (!created?.id) {
                        throw new Error("missing-created-id");
                      }

                      setCreatedTripAccommodationId(created.id);
                      setCheckoutPaymentError(null);
                      setCreatingCheckoutPayment(false);

                      try {
                        const tripAccs = await TripsApiService.getTripAccommodations(tripId);
                        const dates = (tripAccs ?? [])
                          .flatMap((t) => [asDate((t as any)?.startDate), asDate((t as any)?.endDate)])
                          .filter(Boolean) as Date[];
                        if (dates.length >= 2) {
                          const minStart = new Date(Math.min(...dates.map((d) => d.getTime())));
                          const maxEnd = new Date(Math.max(...dates.map((d) => d.getTime())));
                          await TripsApiService.putTripConfiguration(tripId, {
                            startDate: toDateOnlyString(minStart),
                            endDate: toDateOnlyString(maxEnd),
                          });
                        }
                      } catch {
                        // Best-effort
                      }

                      await onTripAccommodationsChanged?.();

                      setStep(4);
                    } catch {
                      setCreateTripAccommodationError("Não foi possível adicionar a hospedagem. Tente novamente.");
                    } finally {
                      setCreatingTripAccommodation(false);
                    }
                  }}
                />
              )}
            </div>
          ) : step === 4 ? (
            <div className="space-y-5">
              <div className="rounded-2xl border border-secondary-200 bg-white p-5 md:p-6">
                <p className="font-baloo text-xl font-bold text-secondary-900">Hospedagem adicionada à sua jornada</p>
                <p className="font-comfortaa text-sm text-secondary-600 mt-2">
                  O que você deseja fazer agora?
                </p>

                {checkoutPaymentError ? (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
                    <p className="font-comfortaa text-sm text-red-800">{checkoutPaymentError}</p>
                  </div>
                ) : null}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={creatingCheckoutPayment}
                    onClick={async () => {
                      setCheckoutPaymentError(null);
                      await onTripAccommodationsChanged?.();
                      onClose();
                      router.push(`/app/viagens/${encodeURIComponent(tripId)}#details`);
                    }}
                    className="h-12 rounded-xl border border-secondary-200 bg-white font-comfortaa text-sm font-semibold text-secondary-800 hover:bg-secondary-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Encerrar e continuar organizando
                  </button>

                  <button
                    type="button"
                    disabled={creatingCheckoutPayment || !createdTripAccommodationId}
                    onClick={async () => {
                      if (!createdTripAccommodationId) {
                        setCheckoutPaymentError("Não foi possível identificar a hospedagem criada. Tente novamente.");
                        return;
                      }

                      setCreatingCheckoutPayment(true);
                      setCheckoutPaymentError(null);
                      try {
                        const item: CheckoutPaymentItem = { type: "ACCOMMODATION", id: createdTripAccommodationId };
                        const res = await PaymentsApiService.createCheckoutPayment({
                          tripId,
                          items: [item],
                        });
                        if (!res?.id) throw new Error("missing-payment-id");

                        await onTripAccommodationsChanged?.();
                        onClose();
                        router.push(`/app/checkout/${encodeURIComponent(res.id)}`);
                      } catch {
                        setCheckoutPaymentError("Não foi possível iniciar o checkout. Tente novamente.");
                      } finally {
                        setCreatingCheckoutPayment(false);
                      }
                    }}
                    className="h-12 rounded-xl bg-primary-600 text-white font-comfortaa text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {creatingCheckoutPayment ? "Preparando checkout..." : "Ir para o checkout"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
    ,
    document.body
  );
}

