"use client";

import { useEffect, useRef, useState } from "react";

import {
  PublicAccommodationRoom,
  PublicAccommodationRoomAvailability,
  PublicAccommodationImage,
  AccommodationRateConditionItem,
  AccommodationAvailabilityConditionsResponse,
} from "@/core/types/accommodations";

import { ImageGrid } from "@/components/common/ImageGrid";

import { RoomAvailabilityPrice } from "@/components/accommodation/RoomAvailabilityPrice";

import { AccommodationsApiService } from "@/clients/accommodations";

import Image from "next/image";
import type { FamilyRoom, FamilyTravellers } from "@/components/trip-planning/familyTypes";

const PROSE_CONTAINED =
  "prose prose-lg max-w-none text-gray-700 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full";

interface AccommodationRoomDetailModalProps {
  room: PublicAccommodationRoom | PublicAccommodationRoomAvailability;

  isOpen: boolean;

  onClose: () => void;

  /** From availability search; required to load conditions for bookable stays */

  transactionId: string | null;

  accommodationUniqueName: string;

  /** Rate shown in the card; should be pre-selected inside the modal (when present). */
  preselectedRateId?: string | null;

  travelersSummary?:
    | { type: "COUPLE" }
    | { type: "FAMILY"; travelers: FamilyTravellers; rooms: FamilyRoom[] };
}

const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null;

  return `/assets/amenities/${iconName}.svg`;
};

function safeHtmlOrNull(html?: string | null): string | null {
  const raw = html?.trim();
  return raw ? raw : null;
}

function pickMinRate(
  rates: (AccommodationRateConditionItem | PublicAccommodationRoomAvailability["rates"][number])[],
  match: (r: any) => boolean
) {
  const filtered = rates.filter(match);
  if (!filtered.length) return null;
  return filtered.reduce((min: any, r: any) => (r.price < min.price ? r : min), filtered[0]);
}

type MealPlanKind = "NONE" | "BREAKFAST" | "HALF" | "FULL" | "ALL";

function mealPlanKindForRate(rate: any): MealPlanKind {
  if (rate.isAllInclusive) return "ALL";
  if (rate.hasFullBoard) return "FULL";
  if (rate.hasHalfBoard) return "HALF";
  if (rate.hasBreakfast) return "BREAKFAST";
  return "NONE";
}

function mealPlanLabelForKind(kind: MealPlanKind): string {
  switch (kind) {
    case "ALL":
      return "All inclusive";
    case "FULL":
      return "Pensão completa";
    case "HALF":
      return "Meia pensão";
    case "BREAKFAST":
      return "Café da manhã incluído";
    case "NONE":
    default:
      return "Sem café da manhã";
  }
}

export function AccommodationRoomDetailModal({
  room,

  isOpen,

  onClose,

  transactionId,

  accommodationUniqueName,
  preselectedRateId,
  travelersSummary,
}: AccommodationRoomDetailModalProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [conditionsData, setConditionsData] =
    useState<AccommodationAvailabilityConditionsResponse | null>(null);

  const [conditionsLoading, setConditionsLoading] = useState(false);

  const [conditionsError, setConditionsError] = useState<string | null>(null);

  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const lastConditionsRequestKeyRef = useRef<string | null>(null);

  const roomImageUrls = room.images.map((image: PublicAccommodationImage) => image.url);

  const isAvailabilityRoom =
    "rates" in room && Array.isArray((room as PublicAccommodationRoomAvailability).rates);

  const availabilityRoom = isAvailabilityRoom
    ? (room as PublicAccommodationRoomAvailability)
    : null;

  const availabilityRates = availabilityRoom?.rates ?? [];

  const ratesSnapshot =
    availabilityRoom && availabilityRoom.rates.length > 0
      ? availabilityRoom.rates.map((r) => `${r.id}:${r.vendor}`).join("|")
      : "";

  const initialRateId =
    preselectedRateId ?? (availabilityRates.length > 0 ? availabilityRates[0]?.id ?? null : null);

  useEffect(() => {
    if (!isOpen) return;

    setIsDescriptionExpanded(false);

    if (initialRateId) setSelectedRateId(initialRateId);
    else setSelectedRateId(null);
  }, [isOpen, room.id, initialRateId]);

  useEffect(() => {
    if (!isOpen) {
      setConditionsData(null);

      setConditionsError(null);

      setConditionsLoading(false);

      return;
    }

    const roomRates = isAvailabilityRoom
      ? (room as PublicAccommodationRoomAvailability).rates
      : undefined;

    const canFetch =
      !!transactionId && !!roomRates?.length && roomRates.every((r) => r.id && r.vendor);

    if (!canFetch) {
      setConditionsData(null);

      setConditionsError(null);

      setConditionsLoading(false);

      return;
    }

    if (!selectedRateId) {
      setConditionsData(null);
      setConditionsError(null);
      setConditionsLoading(false);
      return;
    }

    const selectedRate = roomRates.find((r) => r.id === selectedRateId);
    if (!selectedRate?.vendor) {
      setConditionsData(null);
      setConditionsError(null);
      setConditionsLoading(false);
      return;
    }

    const vendor = selectedRate.vendor;
    const roomRateIds = [selectedRateId];
    const requestKey = `${transactionId}:${accommodationUniqueName}:${vendor}:${roomRateIds.join(
      ","
    )}`;

    // Prevent duplicate calls (e.g. React StrictMode double-invokes effects in dev).
    if (lastConditionsRequestKeyRef.current === requestKey) {
      return;
    }
    lastConditionsRequestKeyRef.current = requestKey;

    let cancelled = false;

    setConditionsLoading(true);

    setConditionsError(null);

    setConditionsData(null);

    AccommodationsApiService.postAccommodationAvailabilityConditions(accommodationUniqueName, {
      uniqueTransactionId: transactionId,
      vendor,
      roomRateIds,
    })

      .then((data) => {
        if (!cancelled) {
          setConditionsData(data);
        }
      })

      .catch(() => {
        if (!cancelled) {
          setConditionsError(
            "Não foi possível carregar as condições desta reserva. Tente novamente."
          );

          setConditionsData(null);
        }
      })

      .finally(() => {
        if (!cancelled) setConditionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    isOpen,
    transactionId,
    accommodationUniqueName,
    room.id,
    ratesSnapshot,
    isAvailabilityRoom,
    selectedRateId,
  ]);

  if (!isOpen) return null;

  const showRatesPanel =
    availabilityRates.length > 0 &&
    !!transactionId &&
    availabilityRates.every((r) => r.id && r.vendor);

  const candidateRates = (() => {
    const kinds: MealPlanKind[] = ["NONE", "BREAKFAST", "HALF", "FULL", "ALL"];
    const picked: any[] = [];

    for (const kind of kinds) {
      const pickNoCancel = pickMinRate(
        availabilityRates,
        (r) => mealPlanKindForRate(r) === kind && !r.isCancellable
      );
      const pickCancel = pickMinRate(
        availabilityRates,
        (r) => mealPlanKindForRate(r) === kind && r.isCancellable
      );
      if (pickNoCancel) picked.push(pickNoCancel);
      if (pickCancel) picked.push(pickCancel);
    }

    // Ensure the current (main) selection is included.
    const selected = availabilityRates.find((r) => r.id === selectedRateId);
    if (selected) picked.unshift(selected);

    const byId = new Map<string, any>();
    for (const r of picked) {
      if (r?.id) byId.set(r.id, r);
    }
    return Array.from(byId.values());
  })();

  const travelersBlock = (() => {
    if (travelersSummary?.type === "FAMILY") {
      const t = travelersSummary.travelers;
      const rooms = travelersSummary.rooms;
      return (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
          <p className="text-gray-700">
            {t.adults} adulto(s)
            {t.children > 0 ? ` · ${t.children} criança(s)` : ""} · {rooms.length} quarto(s)
          </p>
          <ul className="mt-2 space-y-1 text-xs text-gray-700">
            {rooms.map((r, idx) => (
              <li key={idx}>
                <span className="font-semibold">Quarto {idx + 1}</span>: {r.adults} adulto(s)
                {r.children > 0 ? ` · ${r.children} criança(s)` : ""}{" "}
                {r.childrenAges?.length ? `· idades: ${r.childrenAges.join(", ")}` : ""}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
        <p className="text-gray-700">2 adulto(s) · 1 quarto</p>
      </div>
    );
  })();

  const canReserve = !!selectedRateId && !!conditionsData && !conditionsLoading && !conditionsError;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] my-8 relative flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {roomImageUrls.length > 0 && (
            <div className="w-full">
              <ImageGrid images={roomImageUrls} title={room.title} edgeToEdge />
            </div>
          )}

          <div className="px-8 pb-8 pt-6">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">{room.title}</h2>

            {room.subtitle && (
              <div className="min-w-0 mb-6">
                <div
                  className={`${PROSE_CONTAINED} text-gray-600 ${
                    isDescriptionExpanded ? "" : "max-h-[28vh] overflow-hidden"
                  }`}
                  dangerouslySetInnerHTML={{ __html: room.subtitle }}
                />

                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
                </button>
              </div>
            )}

            {availabilityRates.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Tarifas e condições</h3>

                {travelersBlock}

                <p className="text-sm text-gray-600 mb-4">
                  Selecione uma tarifa para ver as condições e reservar.
                </p>

                <div className="space-y-2 mb-6">
                  {candidateRates.map((rate) => {
                    const kind = mealPlanKindForRate(rate);
                    const label = mealPlanLabelForKind(kind);
                    const isSelected = selectedRateId === rate.id;

                    return (
                      <label
                        key={rate.id}
                        className={`block cursor-pointer rounded-xl border-2 px-4 py-3 transition-colors ${
                          isSelected
                            ? "border-primary-500 bg-primary-50/60"
                            : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="room-rate"
                            className="mt-1 h-4 w-4 shrink-0 text-primary-600 focus:ring-primary-500"
                            checked={isSelected}
                            onChange={() => setSelectedRateId(rate.id)}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p
                                  className={`text-sm font-semibold ${
                                    isSelected ? "text-gray-900" : "text-gray-700"
                                  }`}
                                >
                                  {label}
                                </p>
                                {rate.isCancellable ? (
                                  <>
                                    {rate.cancellationPolicy ? (
                                      <p className="text-xs text-green-700 leading-snug">
                                        {rate.cancellationPolicy}
                                      </p>
                                    ) : null}
                                  </>
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

                {showRatesPanel && conditionsLoading && (
                  <p className="text-sm text-gray-600 py-4">Carregando condições da reserva…</p>
                )}

                {showRatesPanel && conditionsError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 mb-4">
                    {conditionsError}
                  </div>
                )}

                {/* Conditions endpoint no longer returns canBook/canPayLater */}

                {showRatesPanel && conditionsData?.rates?.[0] && !conditionsLoading && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h4 className="text-base font-bold text-gray-900 mb-3">
                      Condições da tarifa selecionada
                    </h4>

                    {(() => {
                      const rate = conditionsData.rates[0];
                      const moreInformationHtml = safeHtmlOrNull(rate.moreInformation);
                      const propertyTaxes = (rate.propertyTaxes ?? []).filter(
                        (t) => t.amount !== 0
                      );

                      return (
                        <div className="space-y-4">
                          <RoomAvailabilityPrice rate={rate} size="modal" />

                          <div className="flex flex-wrap gap-2">
                            {rate.priceHasChanged && (
                              <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                                Preço atualizado
                              </span>
                            )}
                            {rate.isSpecialOffer && (
                              <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-800">
                                Oferta especial
                              </span>
                            )}
                            {rate.isNonRefundable && (
                              <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                                Não reembolsável
                              </span>
                            )}
                          </div>

                          {rate.cancellationPolicy && (
                            <p
                              className={`text-sm leading-snug ${
                                rate.isCancellable ? "text-green-700" : "text-red-700"
                              }`}
                            >
                              {rate.cancellationPolicy}
                            </p>
                          )}

                          {rate.bedDescription && (
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">Cama</span>: {rate.bedDescription}
                            </p>
                          )}

                          {(rate.checkInTime || rate.checkOutTime) && (
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">Horários</span>:{" "}
                              {rate.checkInTime ? `check-in ${rate.checkInTime}` : "check-in —"}
                              {" · "}
                              {rate.checkOutTime ? `check-out ${rate.checkOutTime}` : "check-out —"}
                            </p>
                          )}

                          {propertyTaxes.length > 0 && (
                            <div className="rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2">
                              <p className="text-xs font-semibold text-gray-700 mb-2">
                                Taxas do estabelecimento
                              </p>
                              <ul className="space-y-1 text-xs text-gray-700">
                                {propertyTaxes.map((t, idx) => (
                                  <li
                                    key={idx}
                                    className={`flex gap-3 ${
                                      t.description?.trim() ? "justify-between" : "justify-end"
                                    }`}
                                  >
                                    {t.description?.trim() ? (
                                      <span className="min-w-0 text-left">
                                        {t.description.trim()}
                                      </span>
                                    ) : null}
                                    <span className="font-medium shrink-0 tabular-nums">
                                      {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: rate.currency || "BRL",
                                      }).format(t.amount)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {moreInformationHtml && (
                            <div
                              className="prose prose-sm max-w-none text-gray-700 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2 [&_p]:my-1"
                              dangerouslySetInnerHTML={{ __html: moreInformationHtml }}
                            />
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div className="mt-4 rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-900">
                  <p className="font-semibold">
                    Valores exclusivos para membros do Círculo Evolved
                  </p>
                  <p className="mt-1 leading-relaxed">
                    Membros do Círculo Evolved têm acesso a valores <strong>sem comissão</strong>, o
                    que garante a melhor condição e curadoria das melhores hospedagens sem viés.
                    Apenas membros podem reservar — você pode se tornar membro durante o checkout
                    para liberar a reserva.
                  </p>
                  <a
                    href="/circulo-evolved"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block font-semibold underline underline-offset-2 hover:opacity-90"
                  >
                    Saiba mais sobre o Círculo Evolved
                  </a>
                </div>

                {showRatesPanel && (
                  <div className="mt-6">
                    <button
                      type="button"
                      disabled={!canReserve}
                      className={`w-full rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                        canReserve
                          ? "border-2 border-primary-600 bg-primary-600 text-white hover:bg-primary-700 hover:border-primary-700"
                          : "cursor-not-allowed border border-gray-300 bg-gray-200 text-gray-500"
                      }`}
                    >
                      Reservar com a tarifa selecionada
                    </button>
                  </div>
                )}
              </div>
            )}

            {room.amenities && room.amenities.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Comodidades do quarto</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {room.amenities.map((amenity, index) => {
                    const amenityIconPath = getAmenityIconPath(amenity.icon);

                    return (
                      <div
                        key={index}
                        className={`flex items-center bg-gray-50 border border-gray-100 px-2 py-1.5 rounded-md ${
                          amenityIconPath ? "gap-2" : ""
                        }`}
                      >
                        {amenityIconPath ? (
                          <div className="w-4 h-4 flex-shrink-0 text-primary-600">
                            <Image
                              src={amenityIconPath}
                              alt={amenity.title}
                              width={16}
                              height={16}
                              className="w-full h-full"
                            />
                          </div>
                        ) : null}

                        <span className="text-gray-700 text-xs leading-snug line-clamp-2">
                          {amenity.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
