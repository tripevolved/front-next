"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AccommodationsApiService } from "@/clients/accommodations";
import type { AccommodationAvailabilityConditionsRequest } from "@/clients/accommodations";
import { PaymentsApiService } from "@/clients/payments";
import { TripsApiService } from "@/clients/trips";
import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import { formatPtBrDateRangeLong, parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";
import { JourneyAccommodationDetailsModal } from "@/components/trips/JourneyAccommodationDetailsModal";
import { useSWRConfig } from "swr";

const PLACEHOLDER_IMAGE = "/assets/blank-image.png";

function imageUrl(img?: { url: string } | null): string | null {
  const u = img?.url?.trim();
  return u ? u : null;
}

function stayLabel(acc: TripAccommodationItem): string | null {
  const start = parseDateOnlyToLocalDate(acc.startDate);
  const end = parseDateOnlyToLocalDate(acc.endDate);
  if (!start || !end) return null;
  return formatPtBrDateRangeLong(start, end);
}

type PaymentStatus = "PAID" | "NOT_PAID";
type ReservationStatus = "CONFIRMED" | "PENDING" | "CANCELED" | "REJECTED";

function formatMoneyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function pillClass(kind: "payment" | "reservation", value: PaymentStatus | ReservationStatus): string {
  if (kind === "payment") {
    if (value === "PAID") return "bg-green-50 text-green-800 border border-green-200";
    if (value === "NOT_PAID") return "bg-amber-50 text-amber-900 border border-amber-200";
    return "bg-secondary-50 text-secondary-800 border border-secondary-200";
  }

  // reservation
  if (value === "CONFIRMED") return "bg-green-50 text-green-800 border border-green-200";
  if (value === "PENDING") return "bg-blue-50 text-blue-800 border border-blue-200";
  if (value === "CANCELED") return "bg-secondary-100 text-secondary-700 border border-secondary-200";
  if (value === "REJECTED") return "bg-red-50 text-red-800 border border-red-200";
  return "bg-secondary-50 text-secondary-800 border border-secondary-200";
}

function pillLabel(kind: "payment" | "reservation", value: PaymentStatus | ReservationStatus): string {
  if (kind === "payment") {
    if (value === "PAID") return "Paga";
    if (value === "NOT_PAID") return "Não paga";
    return value;
  }
  if (value === "CONFIRMED") return "Confirmada";
  if (value === "PENDING") return "Pendente";
  if (value === "CANCELED") return "Cancelada";
  if (value === "REJECTED") return "Rejeitada";
  return value;
}

export function JourneyAccommodationCard({
  tripId,
  accommodation,
}: {
  tripId: string;
  accommodation: TripAccommodationItem;
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [availabilityStatus, setAvailabilityStatus] = useState<
    "idle" | "loading" | "available" | "unavailable"
  >("idle");
  const [actionError, setActionError] = useState<string | null>(null);
  const [creatingPayment, setCreatingPayment] = useState(false);
  const [revalidating, setRevalidating] = useState(false);
  const conditionsRequestKeyRef = useRef<string | null>(null);
  const cover = imageUrl(accommodation.coverImage) ?? PLACEHOLDER_IMAGE;
  const label = stayLabel(accommodation);
  const tags = (accommodation.tags ?? []).filter(Boolean);
  const recommendedFor = (accommodation.recommendedFor ?? []).filter(Boolean);
  const savings = (accommodation as any)?.savings as number | null | undefined;
  const amount = (accommodation as any)?.amount as number | null | undefined;
  const canOpenDetails = (accommodation.rooms ?? []).some(
    (r) => (r as any)?.reservationStatus === "CONFIRMED"
  );
  const needsPayment = (accommodation.rooms ?? []).every(
    (r) => (r as any)?.paymentStatus === "NOT_PAID"
  );

  const conditionsRequestKey = useMemo(() => {
    if (!needsPayment) return null;
    const accommodationUniqueName = accommodation.uniqueName;
    const uniqueTransactionId = accommodation.uniqueTransactionId ?? null;
    const vendor = (accommodation as any)?.vendor as string | undefined;
    const roomRateIds = (accommodation.rooms ?? []).map((r) => r.rateId).filter(Boolean);
    const roomRateIdsKey = roomRateIds.join(",");
    return `${tripId}:${accommodation.id}:${accommodationUniqueName}:${uniqueTransactionId ?? ""}:${vendor ?? ""}:${roomRateIdsKey}`;
  }, [
    needsPayment,
    tripId,
    accommodation.id,
    accommodation.uniqueName,
    accommodation.uniqueTransactionId,
    (accommodation as any)?.vendor,
    (accommodation.rooms ?? []).map((r) => r.rateId).join(","),
  ]);

  useEffect(() => {
    if (!needsPayment) {
      setAvailabilityStatus("idle");
      return;
    }
    if (!conditionsRequestKey) return;

    // Avoid restarting the request on re-renders with same inputs.
    if (conditionsRequestKeyRef.current === conditionsRequestKey) return;
    conditionsRequestKeyRef.current = conditionsRequestKey;

    const accommodationUniqueName = accommodation.uniqueName;
    const uniqueTransactionId = accommodation.uniqueTransactionId ?? null;
    const vendor = (accommodation as any)?.vendor as string | undefined;
    const roomRateIds = (accommodation.rooms ?? []).map((r) => r.rateId).filter(Boolean);

    if (!accommodationUniqueName || !uniqueTransactionId || !vendor || roomRateIds.length === 0) {
      setAvailabilityStatus("unavailable");
      return;
    }

    setAvailabilityStatus("loading");
    const body: AccommodationAvailabilityConditionsRequest = {
      uniqueTransactionId,
      vendor,
      roomRateIds,
    };

    AccommodationsApiService.postAccommodationAvailabilityConditions(accommodationUniqueName, body)
      .then((res) => {
        if (conditionsRequestKeyRef.current !== conditionsRequestKey) return;
        if (Array.isArray(res?.rates) && res.rates.length > 0) setAvailabilityStatus("available");
        else setAvailabilityStatus("unavailable");
      })
      .catch(() => {
        if (conditionsRequestKeyRef.current !== conditionsRequestKey) return;
        setAvailabilityStatus("unavailable");
      });
  }, [needsPayment, conditionsRequestKey, accommodation]);

  return (
    <div className="rounded-2xl border border-secondary-200 bg-white shadow-sm overflow-hidden">
      <div className="md:grid" style={{ gridTemplateColumns: "45% 55%" }}>
        {/* Left: accommodation info */}
        <div className="border-b md:border-b-0 md:border-r border-secondary-100">
          <div className="relative w-full h-44 md:h-52 overflow-hidden bg-secondary-100">
            <Image
              src={cover}
              alt={accommodation.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>

          <div className="p-5 md:p-6 min-w-0">
            <h3 className="font-baloo text-lg md:text-xl font-bold text-secondary-900">
              {accommodation.name}
            </h3>
            <p className="font-comfortaa text-sm text-secondary-600 mt-1">
              {accommodation.fullAddress}
            </p>

            {(tags.length > 0 || recommendedFor.length > 0) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t, i) => (
                  <span
                    key={`tag:${accommodation.id}:${i}`}
                    className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {t}
                  </span>
                ))}
                {recommendedFor.map((t, i) => (
                  <span
                    key={`rec:${accommodation.id}:${i}`}
                    className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: rooms */}
        <div className="p-5 md:p-6">
          <div className="flex justify-between items-center">
            {label ? (
              <p className="font-baloo text-lg md:text-xl font-bold text-secondary-900">{label}</p>
            ) : null}
            {amount ? (
              <p className="font-baloo text-sm font-bold text-secondary-500">{formatMoneyBRL(amount)}</p>
            ) : null}
          </div>
          <h4 className="font-baloo text-base md:text-lg font-bold text-secondary-900">Quartos</h4>
          <div className="mt-4 space-y-3">
            {(accommodation.rooms ?? []).length === 0 ? (
              <p className="font-comfortaa text-sm text-secondary-600">Informações dos quartos indisponíveis.</p>
            ) : (
              accommodation.rooms.map((r) => {
                const roomCover = imageUrl(r.coverImage) ?? PLACEHOLDER_IMAGE;
                const adults = typeof r.adults === "number" ? r.adults : null;
                const children = typeof r.children === "number" ? r.children : null;
                const hasOcc = adults != null || children != null;
                const paymentStatus = (r as any)?.paymentStatus as PaymentStatus | "NOT_PAID";
                const reservationStatus = (r as any)?.reservationStatus as ReservationStatus | "PENDING";
                const boardDescription = (r as any)?.boardDescription as string | null | undefined;
                const cancellationPolicy = (r as any)?.cancellationPolicy as string | null | undefined;
                const propertyTaxes = (r as any)?.propertyTaxes as number | null | undefined;
                return (
                  <div key={r.rateId} className="w-full p-0">
                    <div className="grid items-start gap-3" style={{ gridTemplateColumns: "20% 80%" }}>
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-secondary-100">
                        <Image
                          src={roomCover}
                          alt={r.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 20vw, 180px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-comfortaa font-semibold text-secondary-900">{r.name}</p>
                        {(paymentStatus || reservationStatus) && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {reservationStatus ? (
                              <span
                                className={[
                                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                                  pillClass("reservation", reservationStatus),
                                ].join(" ")}
                              >
                                {pillLabel("reservation", reservationStatus)}
                              </span>
                            ) : null}
                            {paymentStatus ? (
                              <span
                                className={[
                                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                                  pillClass("payment", paymentStatus),
                                ].join(" ")}
                              >
                                {pillLabel("payment", paymentStatus)}
                              </span>
                            ) : null}
                          </div>
                        )}
                        {hasOcc ? (
                          <div className="mt-1 space-y-1">
                            <p className="font-comfortaa text-xs text-secondary-600">
                              <span className="tabular-nums">
                                {adults != null ? `Para ${adults} adulto${adults === 1 ? "" : "s"}` : ""}
                                {adults != null && children != null && children > 0 ? " · " : ""}
                                {children != null && children > 0
                                  ? `${children} criança${children === 1 ? "" : "s"}`
                                  : ""}
                              </span>
                            </p>
                            {boardDescription ? (
                              <p className="font-comfortaa text-xs text-secondary-600">{boardDescription}</p>
                            ) : null}
                            {cancellationPolicy ? (
                              <p className="font-comfortaa text-xs text-secondary-600">{cancellationPolicy}</p>
                            ) : null}
                          </div>
                        ) : null}

                        {typeof propertyTaxes === "number" && propertyTaxes > 0 ? (
                          <p className="font-comfortaa text-[11px] text-secondary-500 mt-2">
                            *Taxas a serem pagas na hospedagem: <span className="tabular-nums">{formatMoneyBRL(propertyTaxes)}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {typeof savings === "number" && savings > 0 ? (
            <div className="mt-6 border-t border-secondary-100 pt-5">
              {(() => {
                const rooms = accommodation.rooms ?? [];
                const statuses = rooms
                  .map((r) => (r as any)?.paymentStatus as PaymentStatus | undefined)
                  .filter(Boolean) as PaymentStatus[];
                const hasNotPaid = statuses.includes("NOT_PAID");
                const verb = hasNotPaid ? "economizará" : "economizou";
                return (
                  <p className="font-comfortaa text-sm text-secondary-700">
                    Você {verb} <span className="font-semibold tabular-nums text-accent-600">{formatMoneyBRL(savings)}</span>{" "}
                    por estar no Círculo Evolved e não pagar comissões.
                  </p>
                );
              })()}
            </div>
          ) : null}

          {canOpenDetails ? (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDetailsOpen(true)}
                className="font-comfortaa text-sm font-semibold text-accent-600 hover:text-accent-700 hover:underline underline-offset-2 transition-colors"
              >
                Ver detalhes &rarr;
              </button>
            </div>
          ) : needsPayment ? (
            <div className="pt-5 space-y-3">
              {availabilityStatus === "loading" ? (
                <p className="font-comfortaa text-sm text-secondary-600">Verificando disponibilidade...</p>
              ) : availabilityStatus === "available" ? (
                <div className="flex items-center justify-between gap-3">
                  <p className="font-comfortaa text-sm font-semibold text-green-700">Disponível para reserva</p>
                  <button
                    type="button"
                    disabled={creatingPayment}
                    onClick={async () => {
                      if (creatingPayment) return;
                      setActionError(null);
                      setCreatingPayment(true);
                      try {
                        const res = await PaymentsApiService.createCheckoutPayment({
                          tripId,
                          items: [{ type: "ACCOMMODATION", id: accommodation.id }],
                        });
                        if (!res?.id) throw new Error("missing-payment-id");
                        router.push(`/app/checkout/${encodeURIComponent(res.id)}`);
                      } catch {
                        setActionError("Não foi possível iniciar o checkout. Tente novamente.");
                      } finally {
                        setCreatingPayment(false);
                      }
                    }}
                    className="font-comfortaa text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline underline-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Reservar &rarr;
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
                    Indisponível
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={revalidating}
                      onClick={async () => {
                        if (revalidating) return;
                        setActionError(null);
                        setRevalidating(true);
                        try {
                          const res = await TripsApiService.postTripAccommodationRevalidate(tripId, accommodation.id);
                          if (!res?.isSuccessful) {
                            setActionError("Não foi possível atualizar os valores. Tente novamente.");
                          }
                        } catch {
                          setActionError("Não foi possível atualizar os valores. Tente novamente.");
                        } finally {
                          setRevalidating(false);
                          await mutate(["trip-accommodations", tripId]);
                        }
                      }}
                      className="font-comfortaa text-sm font-semibold text-accent-600 hover:text-accent-700 hover:underline underline-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Atualizar valores &rarr;
                    </button>
                    <button
                      type="button"
                      disabled={revalidating}
                      onClick={async () => {
                        if (revalidating) return;
                        setActionError(null);
                        setRevalidating(true);
                        try {
                          const res = await TripsApiService.deleteTripAccommodation(tripId, accommodation.id);
                          if (!res?.isDeleted) {
                            setActionError(res?.message?.trim() || "Não foi possível cancelar a hospedagem.");
                          }
                        } catch {
                          setActionError("Não foi possível cancelar a hospedagem. Tente novamente.");
                        } finally {
                          setRevalidating(false);
                          await mutate(["trip-accommodations", tripId]);
                        }
                      }}
                      className="font-comfortaa text-sm font-semibold text-red-700 hover:text-red-800 hover:underline underline-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Cancelar &rarr;
                    </button>
                  </div>
                </div>
              )}
              {actionError ? (
                <p className="font-comfortaa text-xs text-red-700">{actionError}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {canOpenDetails ? (
        <JourneyAccommodationDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          tripId={tripId}
          accommodationId={accommodation.id}
        />
      ) : null}
    </div>
  );
}

