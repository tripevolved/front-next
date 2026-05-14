"use client";

import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";
import { RoomImagesCarousel } from "@/components/accommodation/RoomImagesCarousel";
import {
  buildCandidateRatesForRoom,
  mealPlanKindForRate,
  mealPlanLabelForKind,
} from "@/components/accommodation/roomCandidateRates";
import type { PublicAccommodationRoomAvailability, PublicAccommodationRoomRate } from "@/core/types/accommodations";

export type AccommodationAvailabilityRoomsGridProps = {
  availabilityLoading: boolean;
  availabilityError: boolean;
  rooms: PublicAccommodationRoomAvailability[];
  selectedRateIdByRoomId: Record<string, string>;
  onSelectedRateIdChange: (roomId: string, rateId: string) => void;
  transactionId?: string | null;
  actionLabel: string;
  onRoomAction: (room: PublicAccommodationRoomAvailability, rate: PublicAccommodationRoomRate) => void | Promise<void>;
  isActionLoading?: boolean;
  actionError?: string | null;
};

export function AccommodationAvailabilityRoomsGrid({
  availabilityLoading,
  availabilityError,
  rooms,
  selectedRateIdByRoomId,
  onSelectedRateIdChange,
  transactionId,
  actionLabel,
  onRoomAction,
  isActionLoading = false,
  actionError = null,
}: AccommodationAvailabilityRoomsGridProps) {
  if (availabilityError) {
    return (
      <EmptyOrErrorState
        status="error"
        title="Não foi possível buscar disponibilidade"
        description="Tente novamente em alguns instantes."
      />
    );
  }

  if (availabilityLoading) {
    return (
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
    );
  }

  const roomsWithRates = rooms.filter((r) => Array.isArray(r.rates) && r.rates.length > 0);

  if (roomsWithRates.length === 0) {
    return (
      <EmptyOrErrorState
        status="empty"
        title="Nenhum quarto disponível"
        description="Tente ajustar as datas para ver outras opções."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-5">
      {actionError ? (
        <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="font-comfortaa text-sm text-red-800">{actionError}</p>
        </div>
      ) : null}

      {roomsWithRates.map((room) => {
        const rates = room.rates ?? [];
        const selectedRateId = selectedRateIdByRoomId[room.id];
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
                            onChange={() => onSelectedRateIdChange(room.id, rate.id)}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p
                                  className={`text-sm font-semibold ${
                                    isSelected ? "text-secondary-900" : "text-secondary-800"
                                  }`}
                                >
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
                disabled={!selectedRate || isActionLoading || !transactionId}
                onClick={() => {
                  if (!selectedRate) return;
                  void onRoomAction(room, selectedRate);
                }}
                className="w-full h-11 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-auto"
              >
                {isActionLoading ? "Processando…" : actionLabel}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
