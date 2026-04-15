"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PaymentsApiService } from "@/clients/payments";
import { TripsApiService } from "@/clients/trips";
import type { TripDetails } from "@/core/types";
import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import type { PaymentStatusResponse, CheckoutPaymentItemResponse } from "@/clients/payments/payments";
import { CircleLoader } from "@/components/common/CircleLoader";

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
      const local = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
      return Number.isNaN(local.getTime()) ? null : local;
    }
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function formatTripDateRangePtBR(start: Date, end: Date): string {
  const startDay = new Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(start);
  const endDay = new Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(end);
  const startMonth = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(start);
  const endMonth = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(end);
  const startYear = new Intl.DateTimeFormat("pt-BR", { year: "numeric" }).format(start);
  const endYear = new Intl.DateTimeFormat("pt-BR", { year: "numeric" }).format(end);

  if (startMonth === endMonth && startYear === endYear) {
    return `De ${startDay} a ${endDay} de ${startMonth} de ${startYear}`;
  }
  if (startYear === endYear) {
    return `De ${startDay} de ${startMonth} a ${endDay} de ${endMonth} de ${startYear}`;
  }
  return `De ${startDay} de ${startMonth} de ${startYear} a ${endDay} de ${endMonth} de ${endYear}`;
}

function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function paymentTypeBadge(paymentType: CheckoutPaymentItemResponse["paymentType"]) {
  if (paymentType === "ON_BOOKING") {
    return (
      <span className="inline-flex items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700 border border-accent-200">
        No ato da reserva
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700 border border-secondary-200">
      Regular
    </span>
  );
}

function subscriptionStaticCopy(type: CheckoutPaymentItemResponse["type"]) {
  if (type === "SUBSCRIPTION_TOTAL") {
    return {
      title: "Círculo Evolved — Total",
      description: "Assinatura anual com Travel Advisor.",
    };
  }
  return {
    title: "Círculo Evolved — Essencial",
    description: "Assinatura anual (condição essencial para a sua reserva).",
  };
}

export function CheckoutPaymentLeftColumn({ paymentId }: { paymentId: string }) {
  const [payment, setPayment] = useState<PaymentStatusResponse | null>(null);
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [accommodationsById, setAccommodationsById] = useState<Record<string, TripAccommodationItem | null>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dateLabel = useMemo(() => {
    const start = asDate(trip?.configuration?.startDate);
    const end = asDate(trip?.configuration?.endDate);
    if (!start || !end) return null;
    return formatTripDateRangePtBR(start, end);
  }, [trip]);

  useEffect(() => {
    if (!paymentId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPayment(null);
    setTrip(null);
    setAccommodationsById({});

    const run = async () => {
      try {
        const p = await PaymentsApiService.getCheckoutPaymentById(paymentId);
        if (cancelled) return;
        setPayment(p);

        if (!p.tripId) {
          setError("Pagamento não possui viagem associada.");
          setLoading(false);
          return;
        }

        const t = await TripsApiService.getTripDetailsById(p.tripId);
        if (cancelled) return;
        setTrip(t);

        const accommodationItems = (p.items ?? []).filter((i) => i.type === "ACCOMMODATION");
        const uniqueIds = Array.from(new Set(accommodationItems.map((i) => i.domainId).filter(Boolean)));
        const results = await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const acc = await TripsApiService.getTripAccommodationById(p.tripId as string, id);
              return [id, acc] as const;
            } catch {
              return [id, null] as const;
            }
          })
        );
        if (cancelled) return;
        setAccommodationsById(Object.fromEntries(results));
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Não foi possível carregar os itens do pagamento.");
          setLoading(false);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [paymentId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-5 py-6">
          <CircleLoader className="h-20 w-20" />
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-secondary-900">Carregando checkout</p>
            <p className="font-comfortaa text-xs text-secondary-600">
              Buscando os itens e detalhes da sua viagem.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="font-comfortaa text-sm text-red-800">{error ?? "Não foi possível carregar o checkout."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {trip ? (
        <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <h2 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900">{trip.title}</h2>
            {trip.destination ? (
              <p className="font-comfortaa text-sm md:text-base text-secondary-700">
                <span className="font-semibold">Destino</span>: {trip.destination}
              </p>
            ) : null}
            {dateLabel ? (
              <p className="font-comfortaa text-sm md:text-base text-secondary-700">{dateLabel}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="space-y-4">
        <h3 className="font-baloo text-lg md:text-xl font-bold text-secondary-900">Itens do pagamento</h3>

        {(payment.items ?? []).map((item, idx) => {
          if (item.type === "ACCOMMODATION") {
            const acc = accommodationsById[item.domainId] ?? null;
            return (
              <div key={`acc:${item.domainId}:${idx}`} className="rounded-2xl border border-secondary-200 bg-white shadow-sm overflow-hidden">
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-baloo text-lg font-bold text-secondary-900 truncate">
                        {acc?.name ?? "Hospedagem"}
                      </p>
                      {acc?.fullAddress ? (
                        <p className="font-comfortaa mt-1 text-sm text-secondary-600 line-clamp-2">
                          {acc.fullAddress}
                        </p>
                      ) : null}
                    </div>
                    <div className="shrink-0 text-right space-y-2">
                      {paymentTypeBadge(item.paymentType)}
                      <p className="font-baloo text-lg font-bold text-secondary-900 tabular-nums">
                        {formatCurrencyBRL(item.amount)}
                      </p>
                    </div>
                  </div>

                  {acc?.coverImage?.url ? (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-secondary-100">
                      <Image
                        src={acc.coverImage.url}
                        alt={acc.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 520px"
                      />
                    </div>
                  ) : null}

                  {(Array.isArray((acc as any)?.tags) && (acc as any).tags.length > 0) ||
                  (Array.isArray((acc as any)?.recommendedFor) && (acc as any).recommendedFor.length > 0) ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {Array.isArray((acc as any)?.tags) && (acc as any).tags.length > 0
                        ? (acc as any).tags.map((tag: string, i: number) => (
                            <span
                              key={`tag:${item.domainId}:${i}`}
                              className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))
                        : null}
                      {Array.isArray((acc as any)?.recommendedFor) && (acc as any).recommendedFor.length > 0
                        ? (acc as any).recommendedFor.map((tag: string, i: number) => (
                            <span
                              key={`rec:${item.domainId}:${i}`}
                              className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))
                        : null}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          }

          if (item.type === "SUBSCRIPTION_ESSENTIAL" || item.type === "SUBSCRIPTION_TOTAL") {
            const copy = subscriptionStaticCopy(item.type);
            return (
              <div key={`sub:${item.type}:${idx}`} className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-baloo text-lg font-bold text-secondary-900">{copy.title}</p>
                    <p className="font-comfortaa text-sm text-secondary-600 mt-1">{copy.description}</p>
                    <div className="mt-3">{paymentTypeBadge(item.paymentType)}</div>
                  </div>
                  <p className="shrink-0 font-baloo text-lg font-bold text-secondary-900 tabular-nums">
                    {formatCurrencyBRL(item.amount)}
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div key={`unknown:${idx}`} className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm">
              <p className="font-comfortaa text-sm text-secondary-700">Item desconhecido.</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

