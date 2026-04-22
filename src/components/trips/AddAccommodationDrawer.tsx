"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DestinationCard from "@/components/destinations/DestinationCard";
import { DestinationsApiService } from "@/clients/destinations";
import type { Destination } from "@/clients/destinations/destinations";
import { AccommodationsApiService } from "@/clients/accommodations";
import type {
  AccommodationByDestinationAvailabilityItem,
  AccommodationByDestinationAvailabilityResponse,
} from "@/clients/accommodations/by-destination-availability";
import DateRangeSelector from "@/components/common/DateRangeSelector";
import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";
import { RoomAvailabilityPrice } from "@/components/accommodation/RoomAvailabilityPrice";
import type { PublicAccommodationRoomRate } from "@/core/types/accommodations";
import type { AccommodationAvailabilityQuery } from "@/clients/accommodations/availability";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TripsApiService } from "@/clients/trips";
import { toDateOnlyString } from "@/clients/accommodations";
import type { PublicAccommodationImage, PublicAccommodationRoomAvailability } from "@/core/types/accommodations";
import type { PublicAccommodation } from "@/core/types/accommodations";
import { PaymentsApiService } from "@/clients/payments";
import type { CheckoutPaymentItem } from "@/core/types/payments";
import { ImageGrid } from "@/components/common/ImageGrid";
import { AccommodationHighlightsSection } from "@/components/accommodation/AccommodationHighlightsSection";
import { AccommodationAmenitiesGrid } from "@/components/accommodation/AccommodationAmenitiesGrid";
import {
  buildCandidateRatesForRoom,
  mealPlanKindForRate,
  mealPlanLabelForKind,
} from "@/components/accommodation/roomCandidateRates";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  relatedDestinationUniqueName?: string | null;
  travelerQuery: AccommodationAvailabilityQuery;
  tripId: string;
  onTripAccommodationsChanged?: () => void | Promise<void>;
};

type Step = 1 | 2 | 3 | 4;

const PROSE_CONTAINED =
  "prose prose-lg max-w-none text-gray-700 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full";

function imageUrl(img?: { url: string } | null): string | null {
  const u = img?.url?.trim();
  return u ? u : null;
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

function RoomImagesCarousel({ images, title }: { images: PublicAccommodationImage[]; title: string }) {
  const urls = useMemo(() => (images ?? []).map((i) => i.url?.trim()).filter(Boolean) as string[], [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [title, urls.join("|")]);

  const goPrev = useCallback(() => {
    if (urls.length <= 1) return;
    setIndex((i) => (i - 1 + urls.length) % urls.length);
  }, [urls.length]);

  const goNext = useCallback(() => {
    if (urls.length <= 1) return;
    setIndex((i) => (i + 1) % urls.length);
  }, [urls.length]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 40;

  if (urls.length === 0) {
    return (
      <div className="relative w-full h-44 md:h-52 bg-secondary-100">
        <Image src="/assets/blank-image.png" alt={title} fill className="object-cover" />
      </div>
    );
  }

  if (urls.length === 1) {
    return (
      <div className="relative w-full h-44 md:h-52 bg-secondary-100">
        <Image src={urls[0]} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-44 md:h-52 bg-secondary-100"
      onTouchStart={(e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
      }}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={() => {
        if (touchStart == null || touchEnd == null) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) goNext();
        if (distance < -minSwipeDistance) goPrev();
        setTouchStart(null);
        setTouchEnd(null);
      }}
    >
      {urls.map((url, i) => (
        <div
          key={`${url}:${i}`}
          className={`absolute inset-0 transition-opacity duration-500 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <Image
            src={url}
            alt={`${title} - Foto ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/90 border border-secondary-200 text-secondary-800 shadow-sm hover:bg-white"
        aria-label="Foto anterior"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/90 border border-secondary-200 text-secondary-800 shadow-sm hover:bg-white"
        aria-label="Próxima foto"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {urls.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir para a foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function AddAccommodationDrawer({
  isOpen,
  onClose,
  relatedDestinationUniqueName,
  travelerQuery,
  tripId,
  onTripAccommodationsChanged,
}: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
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
  const [isStep3DescriptionExpanded, setIsStep3DescriptionExpanded] = useState(false);
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
    setStep(1);
    setSelectedDestination(null);
    setSearch("");
    setSearchResults(null);
    setSearchLoading(false);
    setAvailability(null);
    setAvailabilityLoading(false);
    setAvailabilityError(false);
    setAvailabilityStartDate(null);
    setAvailabilityEndDate(null);
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
    setIsStep3DescriptionExpanded(false);
    setStep3SelectedRateIdByRoomId({});
  }, [isOpen]);

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
    // When destination changes, reset dates/results for step 2.
    setAvailability(null);
    setAvailabilityLoading(false);
    setAvailabilityError(false);
    setAvailabilityStartDate(null);
    setAvailabilityEndDate(null);
  }, [isOpen, selectedDestination?.uniqueName]);

  const debouncedSearch = useMemo(() => search.trim(), [search]);

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

      <aside className="fixed right-0 inset-y-0 w-full bg-white shadow-2xl flex flex-col md:w-2/3">
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

                {searchResults ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((d) => (
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

              {!availabilityStartDate || !availabilityEndDate ? (
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
              {step3AccommodationLoading ? (
                <div className="rounded-2xl bg-white overflow-hidden animate-pulse shadow-sm">
                  <div className="h-44 bg-secondary-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 w-2/3 bg-secondary-100 rounded" />
                    <div className="h-4 w-5/6 bg-secondary-100 rounded" />
                  </div>
                </div>
              ) : step3AccommodationError ? (
                <EmptyOrErrorState
                  status="error"
                  title="Não foi possível carregar a hospedagem"
                  description="Tente novamente em alguns instantes."
                />
              ) : step3Accommodation ? (
                <div className="space-y-6">
                  <div className="overflow-hidden">
                    {step3Accommodation.images?.length ? (
                      <ImageGrid
                        edgeToEdge
                        images={step3Accommodation.images.map((img) => ({
                          url: img.url,
                          shortDescription: img.shortDescription,
                        }))}
                        title={step3Accommodation.title}
                      />
                    ) : null}
                    <div className="p-5 md:p-6 space-y-6">
                      <div className="min-w-0">
                        <p className="font-baloo text-2xl font-bold text-secondary-900">{step3Accommodation.title}</p>
                        {step3Accommodation.subtitle ? (
                          <p className="font-comfortaa text-sm text-secondary-600 mt-1">{step3Accommodation.subtitle}</p>
                        ) : null}
                        {step3Accommodation.location?.address ? (
                          <p className="font-comfortaa text-xs text-secondary-500 mt-1 italic">
                            {step3Accommodation.location.address}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(step3Accommodation.tags ?? []).slice(0, 6).map((t, i) => (
                          <span key={`tag:${i}`} className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {t}
                          </span>
                        ))}
                        {(step3Accommodation.recommendedFor ?? []).slice(0, 6).map((t, i) => (
                          <span key={`rec:${i}`} className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>

                      <section className="min-w-0">
                        <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-3">Descrição</h3>
                        <div
                          className={`${PROSE_CONTAINED} text-secondary-700 ${
                            isStep3DescriptionExpanded ? "" : "max-h-[40vh] overflow-hidden"
                          }`}
                          dangerouslySetInnerHTML={{ __html: step3Accommodation.description }}
                        />
                        <button
                          type="button"
                          onClick={() => setIsStep3DescriptionExpanded((v) => !v)}
                          className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          {isStep3DescriptionExpanded ? "Ver menos" : "Ver mais"}
                        </button>
                      </section>

                      {step3Accommodation.amenities?.length ? (
                        <section className="min-w-0">
                          <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-3">Comodidades</h3>
                          <AccommodationAmenitiesGrid amenities={step3Accommodation.amenities} />
                        </section>
                      ) : null}
                    </div>
                  </div>

                  {step3Accommodation.highlights?.length ? (
                    <AccommodationHighlightsSection
                      title={step3Accommodation.title}
                      highlights={step3Accommodation.highlights}
                      fullWidth
                      bleedToParentPadding
                    />
                  ) : null}
                </div>
              ) : (
                <div className="min-w-0">
                  <p className="font-comfortaa text-xs text-secondary-500">Hospedagem</p>
                  <p className="font-baloo text-lg font-bold text-secondary-900 truncate">
                    {selectedAccommodationTitle ?? "—"}
                  </p>
                </div>
              )}

              {!selectedAccommodationUniqueName || !availabilityStartDate || !availabilityEndDate ? (
                <EmptyOrErrorState
                  status="error"
                  title="Não foi possível carregar os quartos"
                  description="Volte e selecione uma hospedagem e datas."
                />
              ) : step3AvailabilityError ? (
                <EmptyOrErrorState
                  status="error"
                  title="Não foi possível buscar disponibilidade"
                  description="Tente novamente em alguns instantes."
                />
              ) : step3AvailabilityLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-5">
                  {[0, 1].map((i) => (
                    <div key={i} className="rounded-2xl border border-secondary-200 bg-white overflow-hidden animate-pulse">
                      <div className="h-44 md:h-52 bg-secondary-100" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 w-1/2 bg-secondary-100 rounded" />
                        <div className="h-4 w-3/4 bg-secondary-100 rounded" />
                        <div className="h-20 bg-secondary-100 rounded-xl" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (() => {
                const roomsWithRates = (step3Rooms as PublicAccommodationRoomAvailability[]).filter(
                  (r) => Array.isArray(r.rates) && r.rates.length > 0
                );
                return roomsWithRates.length === 0 ? (
                <EmptyOrErrorState
                  status="empty"
                  title="Nenhum quarto disponível"
                  description="Tente ajustar as datas para ver outras opções."
                />
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-5">
                  {createTripAccommodationError ? (
                    <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 p-4">
                      <p className="font-comfortaa text-sm text-red-800">{createTripAccommodationError}</p>
                    </div>
                  ) : null}

                  {roomsWithRates.map((room) => {
                    const rates = room.rates ?? [];
                    const selectedRateId = step3SelectedRateIdByRoomId[room.id];
                    const candidateRates = buildCandidateRatesForRoom(rates, selectedRateId ?? null);
                    const selectedRate =
                      rates.find((r) => r.id === (selectedRateId ?? candidateRates[0]?.id)) ?? candidateRates[0] ?? null;

                    return (
                      <div key={room.id} className="rounded-2xl border border-secondary-200 bg-white overflow-hidden flex flex-col">
                        <RoomImagesCarousel images={room.images ?? []} title={room.title} />

                        <div className="p-5 md:p-6 space-y-4 min-w-0 flex-1 flex flex-col">
                          <div className="min-w-0">
                            <p className="font-baloo text-lg font-bold text-secondary-900">{room.title}</p>
                            {room.subtitle ? (
                              <div
                                className="font-comfortaa text-xs text-secondary-600 mt-1 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: room.subtitle }}
                              />
                            ) : null}
                          </div>

                          <div className="flex-1">
                            <h4 className="font-baloo text-base font-bold text-secondary-900 mb-2">Tarifas</h4>
                            <div className="space-y-2">
                              {candidateRates.map((rate) => {
                                const kind = mealPlanKindForRate(rate);
                                const label = mealPlanLabelForKind(kind);
                                const isSelected = selectedRate?.id === rate.id;

                                return (
                                  <label
                                    key={rate.id}
                                    className={`block cursor-pointer rounded-xl border-2 px-4 py-3 transition-colors ${
                                      isSelected
                                        ? "border-primary-500 bg-primary-50/60"
                                        : "border-secondary-200 bg-secondary-50 text-secondary-700 hover:border-secondary-300"
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <input
                                        type="radio"
                                        name={`room-rate:${room.id}`}
                                        className="mt-1 h-4 w-4 shrink-0 text-primary-600 focus:ring-primary-500"
                                        checked={isSelected}
                                        onChange={() =>
                                          setStep3SelectedRateIdByRoomId((prev) => ({ ...prev, [room.id]: rate.id }))
                                        }
                                      />
                                      <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                          <div className="min-w-0">
                                            <p className={`text-sm font-semibold ${isSelected ? "text-secondary-900" : "text-secondary-800"}`}>
                                              {label}
                                            </p>
                                            {rate.isCancellable ? (
                                              rate.cancellationPolicy ? (
                                                <p className="text-xs text-green-700 leading-snug">{rate.cancellationPolicy}</p>
                                              ) : null
                                            ) : (
                                              <p className="text-xs text-red-700">Não reembolsável</p>
                                            )}
                                          </div>
                                          <div className="shrink-0">
                                            <span className="text-sm font-semibold text-primary-700 tabular-nums">
                                              {new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: rate.currency || "BRL",
                                              }).format(rate.price)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            type="button"
                            disabled={!selectedRate || creatingTripAccommodation}
                            onClick={async () => {
                              if (!selectedRate) return;
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

                                // Keep list fresh for the trip page even before the drawer closes.
                                await onTripAccommodationsChanged?.();

                                setStep(4);
                              } catch {
                                setCreateTripAccommodationError("Não foi possível adicionar a hospedagem. Tente novamente.");
                              } finally {
                                setCreatingTripAccommodation(false);
                              }
                            }}
                            className="w-full h-11 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-auto"
                          >
                            {creatingTripAccommodation ? "Adicionando..." : "Selecionar este quarto"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                );
              })()}
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

