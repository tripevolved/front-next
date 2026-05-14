"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { Destination } from "@/clients/destinations/destinations";
import { AccommodationsApiService } from "@/clients/accommodations";
import type { AccommodationAvailabilityQuery } from "@/clients/accommodations";
import type { AccommodationByDestinationAvailabilityResponse } from "@/clients/accommodations/by-destination-availability";
import DateRangeSelector from "@/components/common/DateRangeSelector";
import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";
import { RoomAvailabilityPrice } from "@/components/accommodation/RoomAvailabilityPrice";
import type { PublicAccommodationRoomRate } from "@/core/types/accommodations";

function imageUrl(img?: { url: string } | null): string | null {
  const u = img?.url?.trim();
  return u ? u : null;
}

function pickFirstRate(rooms: { rates?: PublicAccommodationRoomRate[] }[]): PublicAccommodationRoomRate | null {
  for (const r of rooms) {
    const rates = r?.rates;
    if (Array.isArray(rates) && rates.length > 0 && rates[0]) return rates[0];
  }
  return null;
}

function getAmenityIconPath(iconName: string | undefined): string | null {
  if (!iconName) return null;
  return `/assets/amenities/${iconName}.svg`;
}

type Props = {
  destination: Destination;
  travelerQuery: AccommodationAvailabilityQuery;
  /** Controlled range so the parent can reuse dates on later steps (e.g. room quote). */
  startDate: Date | null;
  endDate: Date | null;
  onDateRangeChange: (update: [Date | null, Date | null]) => void;
  onSelectAccommodation: (uniqueName: string, title: string) => void;
  compact?: boolean;
};

export function DestinationStayAvailabilityStep({
  destination,
  travelerQuery,
  startDate,
  endDate,
  onDateRangeChange,
  onSelectAccommodation,
  compact = false,
}: Props) {
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [availability, setAvailability] = useState<AccommodationByDestinationAvailabilityResponse | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);

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
    if (!startDate && !endDate) return "Selecione as datas";
    if (startDate && !endDate) {
      return format(startDate, "dd/MM/yyyy", { locale: ptBR });
    }
    if (startDate && endDate) {
      return `${format(startDate, "dd/MM/yyyy", { locale: ptBR })} - ${format(endDate, "dd/MM/yyyy", { locale: ptBR })}`;
    }
    return "Selecione as datas";
  };

  useEffect(() => {
    const destinationUniqueName = destination.uniqueName;
    if (!destinationUniqueName) return;
    if (!startDate || !endDate) {
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
      startDate,
      endDate,
      travelerQuery
    )
      .then((res) => {
        if (cancelled) return;
        const accs = res?.accommodations;
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
  }, [destination.uniqueName, startDate, endDate, travelerQuery]);

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    onDateRangeChange(update);
    if (update[0] && update[1]) setIsCalendarOpen(false);
  };

  const padding = compact ? "p-4 space-y-5" : "p-5 space-y-5";

  return (
    <div className={padding}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-comfortaa text-xs text-secondary-500">Destino</p>
          <p className="font-baloo text-lg font-bold text-secondary-900 truncate">{destination.name}</p>
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
                startDate={startDate}
                endDate={endDate}
                onDateRangeChange={handleDateRangeChange}
                minDate={new Date()}
              />
            </div>
          ) : null}
        </div>
      </div>

      {!startDate || !endDate ? (
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
              firstRate: pickFirstRate(a.rooms ?? []),
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
                    onSelectAccommodation(a.uniqueName, a.title);
                  }}
                  className={[
                    "w-full text-left rounded-2xl border border-secondary-200 bg-white shadow-sm overflow-hidden transition-shadow",
                    disabled ? "opacity-60 grayscale cursor-not-allowed" : "hover:shadow-md",
                  ].join(" ")}
                >
                  <div className="md:grid" style={{ gridTemplateColumns: "45% 55%" }}>
                    <div className="relative w-full h-44 md:h-full bg-secondary-100 min-h-[176px]">
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
                        <p className="font-baloo text-lg md:text-xl font-bold text-secondary-900">{a.title}</p>
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
                            const icon = getAmenityIconPath(am?.icon);
                            return (
                              <div key={i} className="flex min-w-0 items-center gap-2">
                                {icon ? <Image src={icon} alt="" width={18} height={18} className="shrink-0" /> : null}
                                <span className="font-comfortaa text-xs text-secondary-700 truncate">{am.title}</span>
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
  );
}
