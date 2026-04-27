"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  PublicAccommodationRoom,
  PublicAccommodationImage,
  PublicAccommodationRoomAvailability,
  PublicAccommodationRoomRate,
} from "@/core/types/accommodations";
import { AccommodationRoomDetailModal } from "./AccommodationRoomDetailModal";
import { FamilyTravelersModal } from "./FamilyTravelersModal";
import { RoomAvailabilityPrice } from "@/components/accommodation/RoomAvailabilityPrice";
import {
  AccommodationsApiService,
  toDateOnlyString,
  type AvailabilityTravelerType,
  type TravelerInput,
} from "@/clients/accommodations";
import type { FamilyRoom, FamilyTravellers } from "@/components/trip-planning/familyTypes";
import DateRangeSelector from "@/components/common/DateRangeSelector";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buildAccommodationCheckoutHref } from "@/utils/accommodation-checkout-url";
import {
  ACCOMMODATION_STAY_QUERY,
  parseStayDateOnlyParam,
} from "@/utils/accommodation-stay-url";

/** When availability does not return `uniqueTransactionValidUntil`, use a short client default so checkout can proceed. Prefer the API value when present. */
const FALLBACK_UNIQUE_TRANSACTION_VALID_MS = 60 * 60 * 1000;

interface AccommodationRoomsSectionProps {
  rooms?: PublicAccommodationRoom[];
  uniqueName: string;
}

// Helper function to get amenity icon path
const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null;
  return `/assets/amenities/${iconName}.svg`;
};

function getMinRate(
  rates: PublicAccommodationRoomRate[],
  opts: { requireBreakfast: boolean; requireFreeCancellation: boolean }
): PublicAccommodationRoomRate | null {
  const filtered = rates.filter((r) => {
    if (opts.requireBreakfast && !r.hasBreakfast) return false;
    if (opts.requireFreeCancellation && !r.isCancellable) return false;
    return true;
  });
  if (filtered.length === 0) return null;
  return filtered.reduce((min, r) => (r.price < min.price ? r : min), filtered[0]);
}

function buildTravelerInput(
  type: AvailabilityTravelerType,
  family: FamilyTravellers | null,
  familyRooms: FamilyRoom[] | null
): TravelerInput {
  if (type === "COUPLE") {
    const coupleRoom = { adults: 2, children: 0, childrenAges: [] as number[] };
    return {
      type: "COUPLE",
      adults: 2,
      children: 0,
      childrenAges: [],
      rooms: [coupleRoom],
    };
  }
  const f = family ?? {
    adults: 2,
    children: 0,
    childrenAges: [] as number[],
  };
  const rooms =
    familyRooms && familyRooms.length > 0
      ? familyRooms
      : [
          {
            adults: f.adults,
            children: f.children,
            childrenAges: f.childrenAges,
          },
        ];
  return {
    type: "FAMILY",
    adults: f.adults,
    children: f.children,
    childrenAges: f.childrenAges,
    rooms,
  };
}

export function AccommodationRoomsSection({ rooms, uniqueName }: AccommodationRoomsSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stayHydratedFromUrlRef = useRef(false);
  const [selectedRoom, setSelectedRoom] = useState<{
    room: PublicAccommodationRoom | PublicAccommodationRoomAvailability;
    preselectedRateId: string | null;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [availabilityRooms, setAvailabilityRooms] = useState<PublicAccommodationRoomAvailability[]>(
    []
  );
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [transactionValidUntil, setTransactionValidUntil] = useState<Date | null>(null);
  const [travelerType, setTravelerType] = useState<AvailabilityTravelerType>("COUPLE");
  const [familyTravellers, setFamilyTravellers] = useState<FamilyTravellers | null>(null);
  const [familyRooms, setFamilyRooms] = useState<FamilyRoom[] | null>(null);
  const [familyModalOpen, setFamilyModalOpen] = useState(false);
  const [hasFreeCancellation, setHasFreeCancellation] = useState(true);
  const [includesBreakfast, setIncludesBreakfast] = useState(true);
  const dateRangeRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  // Deep-link from coleção (or share URL): checkIn, checkOut, travelerType → pre-fill and fetch availability
  useEffect(() => {
    if (stayHydratedFromUrlRef.current || !searchParams) return;

    const ci = searchParams.get(ACCOMMODATION_STAY_QUERY.checkIn);
    const co = searchParams.get(ACCOMMODATION_STAY_QUERY.checkOut);

    if (!ci || !co) {
      stayHydratedFromUrlRef.current = true;
      return;
    }

    const sd = parseStayDateOnlyParam(ci);
    const ed = parseStayDateOnlyParam(co);
    if (!sd || !ed || sd.getTime() > ed.getTime()) {
      stayHydratedFromUrlRef.current = true;
      return;
    }

    stayHydratedFromUrlRef.current = true;

    setStartDate(sd);
    setEndDate(ed);

    const tt = searchParams.get(ACCOMMODATION_STAY_QUERY.travelerType);
    if (tt === "FAMILY") {
      setTravelerType("FAMILY");
      setFamilyTravellers({ adults: 2, children: 0, childrenAges: [] });
      setFamilyRooms([{ adults: 2, children: 0, childrenAges: [] }]);
    } else if (tt === "COUPLE") {
      setTravelerType("COUPLE");
      setFamilyTravellers(null);
      setFamilyRooms(null);
    }

    requestAnimationFrame(() => {
      document.getElementById("accommodation-rooms")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [searchParams]);

  // Fetch availability when dates and traveler input allow it
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!startDate || !endDate || !uniqueName) {
        setAvailabilityRooms([]);
        setTransactionId(null);
        setTransactionValidUntil(null);
        setIsLoadingAvailability(false);
        return;
      }

      if (travelerType === "FAMILY" && (!familyTravellers || !familyRooms)) {
        setAvailabilityRooms([]);
        setTransactionId(null);
        setTransactionValidUntil(null);
        setAvailabilityError(null);
        setIsLoadingAvailability(false);
        return;
      }

      setIsLoadingAvailability(true);
      setAvailabilityError(null);
      try {
        const availability = await AccommodationsApiService.getAccommodationAvailability(
          uniqueName,
          startDate,
          endDate,
          {
            travelerInput: buildTravelerInput(
              travelerType,
              travelerType === "FAMILY" ? familyTravellers : null,
              travelerType === "FAMILY" ? familyRooms : null
            ),
          }
        );
        setAvailabilityRooms(availability.rooms);
        setTransactionId(availability.transactionId);
        setTransactionValidUntil(availability.uniqueTransactionValidUntil ?? null);
      } catch (error) {
        setAvailabilityError("Erro ao buscar disponibilidade. Tente novamente.");
        setAvailabilityRooms([]);
        setTransactionValidUntil(null);
        console.error("Error fetching availability:", error);
      } finally {
        setIsLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [startDate, endDate, uniqueName, travelerType, familyTravellers, familyRooms]);

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setStartDate(update[0]);
    setEndDate(update[1]);
    if (update[0] && update[1]) {
      setIsCalendarOpen(false);
    }
  };

  const hasDateRange = Boolean(startDate && endDate);

  /** Baseline catalog from accommodation before dates; after a successful availability fetch, only API data. */
  const displayRooms: (PublicAccommodationRoom | PublicAccommodationRoomAvailability)[] = (() => {
    if (!hasDateRange) {
      return rooms ?? [];
    }
    if (travelerType === "FAMILY" && (!familyTravellers || !familyRooms)) {
      return rooms ?? [];
    }
    if (isLoadingAvailability) {
      return [];
    }
    if (availabilityError) {
      return [];
    }
    return availabilityRooms;
  })();

  const showBaselineEmpty = !hasDateRange && (!rooms || rooms.length === 0);
  const showNoRoomsForSelectedDates =
    hasDateRange &&
    !(travelerType === "FAMILY" && (!familyTravellers || !familyRooms)) &&
    !isLoadingAvailability &&
    !availabilityError &&
    availabilityRooms.length === 0;

  const formatDateRange = () => {
    if (!startDate && !endDate) return "Selecione as datas";
    if (startDate && !endDate) return format(startDate, "dd/MM/yyyy", { locale: ptBR });
    if (startDate && endDate) {
      return `${format(startDate, "dd/MM/yyyy", { locale: ptBR })} - ${format(
        endDate,
        "dd/MM/yyyy",
        { locale: ptBR }
      )}`;
    }
    return "Selecione as datas";
  };

  const handleCoupleClick = () => {
    setTravelerType("COUPLE");
    setFamilyTravellers(null);
    setFamilyRooms(null);
    setFamilyModalOpen(false);
  };

  const handleFamilyClick = () => {
    if (travelerType !== "FAMILY") {
      setTravelerType("FAMILY");
    }
    setFamilyModalOpen(true);
  };

  const handleFamilyModalConfirm = (next: FamilyTravellers, rooms: FamilyRoom[]) => {
    setFamilyTravellers(next);
    setFamilyRooms(rooms);
    setFamilyModalOpen(false);
  };

  const handleFamilyModalCancel = () => {
    setFamilyModalOpen(false);
    if (familyTravellers === null) {
      setTravelerType("COUPLE");
    }
  };

  const availabilityFetchSettled =
    hasDateRange &&
    !(travelerType === "FAMILY" && (!familyTravellers || !familyRooms)) &&
    !isLoadingAvailability &&
    !availabilityError;

  const noBookableRateInAnyRoom =
    availabilityFetchSettled &&
    availabilityRooms.length > 0 &&
    availabilityRooms.every(
      (r) =>
        getMinRate(r.rates, {
          requireBreakfast: includesBreakfast,
          requireFreeCancellation: hasFreeCancellation,
        }) == null
    );

  const showTryWithoutCancellationOrBreakfastHint =
    noBookableRateInAnyRoom && (hasFreeCancellation || includesBreakfast);

  return (
    <>
      <section id="accommodation-rooms" className="bg-white py-8 scroll-mt-6 md:scroll-mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Os quartos</h2>
              {!hasDateRange && (rooms?.length ?? 0) > 0 && (
                <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                  Confira as opções abaixo. Ao selecionar as datas da estadia, mostramos preços e
                  disponibilidade retornados em tempo real.
                </p>
              )}
              {hasDateRange && (
                <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                  Preços e informações dos quartos refletem a disponibilidade para o período
                  selecionado.
                </p>
              )}
            </div>

            {/* Traveler type & filters (availability) */}
            <div className="mb-8 space-y-5">
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">Tipo de viagem</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCoupleClick}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors border-2 ${
                      travelerType === "COUPLE"
                        ? "border-primary-600 bg-primary-600 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Casal
                  </button>
                  <button
                    type="button"
                    onClick={handleFamilyClick}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors border-2 ${
                      travelerType === "FAMILY"
                        ? "border-primary-600 bg-primary-600 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Família
                  </button>
                </div>
                {travelerType === "FAMILY" && familyTravellers && familyRooms && (
                  <p className="text-sm text-gray-600 mt-2">
                    {familyTravellers.adults} adulto(s)
                    {familyTravellers.children > 0 && `, ${familyTravellers.children} criança(s)`}
                    {familyRooms.length > 1
                      ? ` · ${familyRooms.length} quartos`
                      : " · 1 quarto"}.{" "}
                    <button
                      type="button"
                      onClick={() => setFamilyModalOpen(true)}
                      className="text-primary-600 font-medium hover:underline"
                    >
                      Editar composição
                    </button>
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={hasFreeCancellation}
                  onClick={() => setHasFreeCancellation((v) => !v)}
                  className={`flex items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 text-left max-w-md w-full sm:w-auto sm:min-w-[220px] ${
                    hasFreeCancellation
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-800">Cancelamento grátis</span>
                  <span
                    className={`h-6 w-11 shrink-0 rounded-full relative transition-colors ${
                      hasFreeCancellation ? "bg-primary-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        hasFreeCancellation ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </span>
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includesBreakfast}
                  onClick={() => setIncludesBreakfast((v) => !v)}
                  className={`flex items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 text-left max-w-md w-full sm:w-auto sm:min-w-[220px] ${
                    includesBreakfast
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-800">Café da manhã incluído</span>
                  <span
                    className={`h-6 w-11 shrink-0 rounded-full relative transition-colors ${
                      includesBreakfast ? "bg-primary-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        includesBreakfast ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* Date Range Selector */}
            <div className="mb-8" ref={dateRangeRef}>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
                Selecione as datas da sua jornada para verificar a disponibilidade
              </label>
              <div className="relative inline-block w-full max-w-md">
                <input
                  type="text"
                  id="dateRange"
                  value={formatDateRange()}
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  readOnly
                  placeholder="Selecione as datas"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-baloo cursor-pointer bg-white"
                />
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
                    className="text-gray-400"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                {isCalendarOpen && (
                  <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 left-0">
                    <DateRangeSelector
                      startDate={startDate}
                      endDate={endDate}
                      onDateRangeChange={handleDateRangeChange}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>
            </div>

            {showTryWithoutCancellationOrBreakfastHint && (
              <div className="mb-6 max-w-2xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-gray-800">
                <p className="leading-relaxed">
                  Nenhum quarto disponível para os critérios atuais. Experimente buscar novamente{" "}
                  <strong>sem exigir cancelamento grátis</strong> e/ou{" "}
                  <strong>café da manhã incluído</strong> — normalmente há mais opções disponíveis.
                </p>
              </div>
            )}

            {hasDateRange && travelerType === "FAMILY" && (!familyTravellers || !familyRooms) && (
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Para buscar quartos e preços, informe quantas pessoas viajam e como ficam
                distribuídas nos quartos. Use o botão <strong>Família</strong> e conclua as duas
                etapas do modal.
              </div>
            )}

            {/* Loading State */}
            {isLoadingAvailability && startDate && endDate && (
              <div className="text-center py-8">
                <p className="text-gray-600">Verificando disponibilidade...</p>
              </div>
            )}

            {/* Error State */}
            {availabilityError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{availabilityError}</p>
              </div>
            )}

            {/* Rooms Grid */}
            {displayRooms.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {displayRooms.map((room) => {
                  const roomImageUrls = room.images.map(
                    (image: PublicAccommodationImage) => image.url
                  );
                  const displayedAmenities = room.amenities?.slice(0, 4) || [];
                  const remainingAmenitiesCount =
                    (room.amenities?.length || 0) - displayedAmenities.length;
                  const isAvailabilityRoom =
                    "rates" in room &&
                    Array.isArray((room as PublicAccommodationRoomAvailability).rates);
                  const availabilityRoom = isAvailabilityRoom
                    ? (room as PublicAccommodationRoomAvailability)
                    : null;
                  const noRatesForAvailability =
                    isAvailabilityRoom &&
                    (room as PublicAccommodationRoomAvailability).rates.length === 0;
                  const bestRate =
                    availabilityRoom && availabilityRoom.rates.length > 0
                      ? getMinRate(availabilityRoom.rates, {
                          requireBreakfast: includesBreakfast,
                          requireFreeCancellation: hasFreeCancellation,
                        })
                      : null;

                  const noRatesForCurrentFilters = isAvailabilityRoom && bestRate == null;

                  const availabilityReady =
                    hasDateRange &&
                    !isLoadingAvailability &&
                    !availabilityError &&
                    !(travelerType === "FAMILY" && (!familyTravellers || !familyRooms)) &&
                    transactionId != null;

                  const canReserveOnCard =
                    availabilityReady &&
                    !noRatesForAvailability &&
                    !noRatesForCurrentFilters &&
                    !!bestRate;

                  return (
                    <div
                      key={room.id}
                      tabIndex={noRatesForAvailability || noRatesForCurrentFilters ? -1 : 0}
                      aria-label={
                        noRatesForAvailability || noRatesForCurrentFilters
                          ? undefined
                          : `Ver detalhes: ${room.title}`
                      }
                      onClick={() => {
                        if (!noRatesForAvailability && !noRatesForCurrentFilters)
                          setSelectedRoom({ room, preselectedRateId: bestRate?.id ?? null });
                      }}
                      onKeyDown={(e) => {
                        if (noRatesForAvailability || noRatesForCurrentFilters) return;
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedRoom({ room, preselectedRateId: bestRate?.id ?? null });
                        }
                      }}
                      className={`flex h-full min-h-0 flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
                        noRatesForAvailability || noRatesForCurrentFilters
                          ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-90"
                          : "bg-white border-gray-200 shadow-lg hover:shadow-2xl cursor-pointer"
                      }`}
                    >
                      {roomImageUrls.length > 0 && (
                        <div
                          className={`relative h-64 w-full overflow-hidden ${
                            noRatesForAvailability ? "grayscale" : ""
                          }`}
                        >
                          <Image
                            src={roomImageUrls[0]}
                            alt={room.title}
                            fill
                            className="object-cover"
                          />
                          {noRatesForAvailability && (
                            <div className="absolute inset-x-0 top-0 bg-gray-900/70 px-3 py-2.5 sm:px-4">
                              <p className="text-xs sm:text-sm font-semibold text-white text-center leading-snug">
                                Indisponível para sua busca
                              </p>
                            </div>
                          )}
                          {roomImageUrls.length > 1 && (
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                              +{roomImageUrls.length - 1} fotos
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className={`flex flex-1 flex-col p-6 ${
                          noRatesForAvailability ? "text-gray-500" : ""
                        }`}
                      >
                        {noRatesForAvailability && roomImageUrls.length === 0 && (
                          <div
                            className="mb-4 rounded-lg border border-gray-300 bg-gray-200/80 px-4 py-3"
                            role="status"
                          >
                            <p className="text-sm font-semibold text-gray-800">
                              Indisponível para sua busca
                            </p>
                            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                              Este quarto não possui tarifas para o período e filtros escolhidos.
                              Ajuste as datas ou as opções acima e tente novamente.
                            </p>
                          </div>
                        )}
                        <h3
                          className={`text-2xl font-bold mb-2 ${
                            noRatesForAvailability ? "text-gray-600" : "text-gray-900"
                          }`}
                        >
                          {room.title}
                        </h3>
                        {room.subtitle && (
                          <div
                            className={`prose prose-lg max-w-none mb-4 min-w-0 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full line-clamp-3 ${
                              noRatesForAvailability ? "text-gray-500" : "text-gray-600"
                            }`}
                            dangerouslySetInnerHTML={{ __html: room.subtitle }}
                          />
                        )}

                        {bestRate && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <RoomAvailabilityPrice rate={bestRate} size="card" />
                            {bestRate.cancellationPolicy && (
                              <p
                                className={`text-xs mt-2 leading-snug ${
                                  bestRate.isCancellable ? "text-green-700" : "text-red-700"
                                }`}
                              >
                                {bestRate.cancellationPolicy}
                              </p>
                            )}
                            <p className="text-xs text-accent-600 font-medium mt-2">
                              Valor disponível apenas para membros Círculo Evolved.
                            </p>
                          </div>
                        )}

                        {displayedAmenities.length > 0 && (
                          <div className="mt-6">
                            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                              {displayedAmenities.map((amenity, index) => {
                                const amenityIconPath = getAmenityIconPath(amenity.icon);

                                return (
                                  <div key={index} className="flex min-w-0 items-center gap-2">
                                    {amenityIconPath ? (
                                      <div
                                        className={`h-5 w-5 flex-shrink-0 ${
                                          noRatesForAvailability
                                            ? "text-gray-400"
                                            : "text-primary-600"
                                        }`}
                                      >
                                        <Image
                                          src={amenityIconPath}
                                          alt=""
                                          width={20}
                                          height={20}
                                          className="h-full w-full"
                                        />
                                      </div>
                                    ) : null}
                                    <span
                                      className={`min-w-0 truncate text-sm leading-snug ${
                                        noRatesForAvailability ? "text-gray-500" : "text-gray-700"
                                      }`}
                                      title={amenity.title}
                                    >
                                      {amenity.title}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            {remainingAmenitiesCount > 0 && (
                              <p
                                className={`text-sm font-medium mt-2 ${
                                  noRatesForAvailability ? "text-gray-400" : "text-primary-600"
                                }`}
                              >
                                +{remainingAmenitiesCount} comodidades
                              </p>
                            )}
                          </div>
                        )}

                        <div className="mt-auto pt-6">
                          <button
                            type="button"
                            disabled={!canReserveOnCard}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                !canReserveOnCard ||
                                !bestRate ||
                                !startDate ||
                                !endDate ||
                                !transactionId
                              ) {
                                return;
                              }
                              if (travelerType === "FAMILY" && (!familyRooms || familyRooms.length === 0)) {
                                return;
                              }
                              const uniqueTransactionValidUntil =
                                transactionValidUntil ??
                                new Date(Date.now() + FALLBACK_UNIQUE_TRANSACTION_VALID_MS);
                              const href = buildAccommodationCheckoutHref({
                                accommodationUniqueName: uniqueName,
                                accommodationRoomId: room.id,
                                startDate: toDateOnlyString(startDate),
                                endDate: toDateOnlyString(endDate),
                                travelerType,
                                rooms: travelerType === "FAMILY" ? familyRooms : undefined,
                                rateId: bestRate.id,
                                vendor: bestRate.vendor,
                                uniqueTransactionId: transactionId,
                                uniqueTransactionValidUntil,
                              });
                              router.push(href);
                            }}
                            className={`w-full rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                              !canReserveOnCard
                                ? "cursor-not-allowed border border-gray-300 bg-gray-200 text-gray-500"
                                : "border-2 border-primary-600 bg-primary-600 text-white hover:bg-primary-700 hover:border-primary-700"
                            }`}
                          >
                            Reservar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {showBaselineEmpty && (
              <p className="text-gray-600 text-center py-8">Nenhum quarto disponível no momento.</p>
            )}

            {showNoRoomsForSelectedDates && (
              <p className="text-gray-600 text-center py-8">
                Nenhum quarto disponível para as datas selecionadas. Tente outro período.
              </p>
            )}
          </div>
        </div>
      </section>

      {selectedRoom && (
        <AccommodationRoomDetailModal
          room={selectedRoom.room}
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          transactionId={transactionId}
          accommodationUniqueName={uniqueName}
          preselectedRateId={selectedRoom.preselectedRateId}
          stayDates={
            startDate && endDate
              ? { start: toDateOnlyString(startDate), end: toDateOnlyString(endDate) }
              : null
          }
          travelersSummary={
            travelerType === "FAMILY" && familyTravellers && familyRooms
              ? { type: "FAMILY", travelers: familyTravellers, rooms: familyRooms }
              : { type: "COUPLE" }
          }
        />
      )}

      <FamilyTravelersModal
        isOpen={familyModalOpen}
        initial={
          familyTravellers && familyRooms
            ? { travelers: familyTravellers, rooms: familyRooms }
            : undefined
        }
        onConfirm={handleFamilyModalConfirm}
        onCancel={handleFamilyModalCancel}
      />
    </>
  );
}
