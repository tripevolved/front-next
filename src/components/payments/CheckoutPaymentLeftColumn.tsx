"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PaymentsApiService } from "@/clients/payments";
import { TripsApiService } from "@/clients/trips";
import { AccommodationsApiService } from "@/clients/accommodations";
import type { TripDetails } from "@/core/types";
import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import type { PaymentStatusResponse, CheckoutPaymentItemResponse } from "@/clients/payments/payments";
import type { AccommodationAvailabilityConditionsResponse } from "@/core/types/accommodations";
import Link from "next/link";
import { useCheckoutConditions } from "@/components/payments/CheckoutConditionsContext";
import {
  CIRCULO_INCLUDED_ESSENTIAL,
  CIRCULO_INCLUDED_TOTAL,
  CIRCULO_TERMS,
} from "@/core/payments/circulo-evolved";

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

function mealPlanLabel(flags?: {
  hasBreakfast?: boolean;
  hasHalfBoard?: boolean;
  hasFullBoard?: boolean;
  isAllInclusive?: boolean;
} | null): string {
  if (!flags) return "Sem café da manhã";
  if (flags.isAllInclusive) return "All inclusive";
  if (flags.hasFullBoard) return "Pensão completa";
  if (flags.hasHalfBoard) return "Meia pensão";
  if (flags.hasBreakfast) return "Café da manhã incluso";
  return "Sem café da manhã";
}

function decodeHtmlEntitiesIter(str: string, maxPasses = 6): string {
  let out = str;
  for (let p = 0; p < maxPasses; p += 1) {
    const next = out
      .replace(/&#x([\da-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&nbsp;/gi, "\u00A0")
      .replace(/&(lt|gt|quot|apos);/gi, (_, name) => {
        const m: Record<string, string> = { lt: "<", gt: ">", quot: '"', apos: "'" };
        return m[name.toLowerCase()] ?? `&${name};`;
      })
      .replace(/&amp;/g, "&");
    if (next === out) break;
    out = next;
  }
  return out;
}

function prepareMoreInformationHtml(input?: string | null): string | null {
  if (input == null) return null;
  let s = String(input).trim();
  if (!s) return null;

  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    try {
      const parsed = JSON.parse(s);
      if (typeof parsed === "string") s = parsed.trim();
    } catch {
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, "\n").trim();
    }
  }

  s = decodeHtmlEntitiesIter(s);
  return s.trim() || null;
}

function subscriptionStaticCopy(type: CheckoutPaymentItemResponse["type"]) {
  if (type === "SUBSCRIPTION_TOTAL") {
    return {
      title: "Círculo Evolved — Total",
      description: "Assinatura anual com Travel Advisor.",
      included: CIRCULO_INCLUDED_TOTAL,
    };
  }
  return {
    title: "Círculo Evolved — Essencial",
    description: "Assinatura anual (condição essencial para a sua reserva).",
    included: CIRCULO_INCLUDED_ESSENTIAL,
  };
}

function priceBadgeFromInstallments(totalInstallments?: number, oneTime?: number) {
  if (typeof totalInstallments !== "number" || typeof oneTime !== "number") return null;
  if (totalInstallments <= 0 || oneTime <= 0) return null;
  const perMonth = totalInstallments / 12;
  const savings = totalInstallments - oneTime;
  const percentOff = savings > 0 ? Math.round((savings / totalInstallments) * 100) : 0;
  return { perMonth, savings, percentOff };
}

export function CheckoutPaymentLeftColumn({ paymentId }: { paymentId: string }) {
  const { setStatus } = useCheckoutConditions();
  const [payment, setPayment] = useState<PaymentStatusResponse | null>(null);
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [accommodationsById, setAccommodationsById] = useState<Record<string, TripAccommodationItem | null>>({});
  const [conditionsByAccommodationId, setConditionsByAccommodationId] = useState<
    Record<string, AccommodationAvailabilityConditionsResponse | null | undefined>
  >({});
  const [conditionsLoadingByAccommodationId, setConditionsLoadingByAccommodationId] = useState<Record<string, boolean>>(
    {}
  );
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
    setConditionsByAccommodationId({});
    setConditionsLoadingByAccommodationId({});

    const run = async () => {
      try {
        const p = await PaymentsApiService.getCheckoutPaymentById(paymentId);
        if (cancelled) return;
        setPayment(p);

        if (!p.tripId) {
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

  useEffect(() => {
    if (!payment?.tripId) return;
    const tripId = payment.tripId;
    const accommodationItems = (payment.items ?? []).filter((i) => i.type === "ACCOMMODATION");
    const accommodationIds = Array.from(new Set(accommodationItems.map((i) => i.domainId).filter(Boolean)));
    if (accommodationIds.length === 0) return;

    let cancelled = false;

    const run = async () => {
      // set loading for those that can fetch
      setConditionsLoadingByAccommodationId((prev) => {
        const next = { ...prev };
        for (const accId of accommodationIds) {
          const acc = accommodationsById[accId];
          const canFetch =
            !!acc?.uniqueTransactionId &&
            !!acc?.uniqueName &&
            !!acc?.vendor &&
            Array.isArray(acc?.rooms) &&
            acc.rooms.map((r) => r.rateId).filter(Boolean).length > 0;
          if (canFetch) {
            next[accId] = true;
            setStatus(accId, "loading");
          } else {
            setStatus(accId, "fail");
          }
        }
        return next;
      });

      const results = await Promise.all(
        accommodationIds.map(async (accId) => {
          const acc = accommodationsById[accId];
          if (!acc?.uniqueTransactionId || !acc.uniqueName || !acc.vendor) return [accId, undefined] as const;
          const roomRateIds = acc.rooms.map((r) => r.rateId).filter(Boolean);
          if (roomRateIds.length === 0) return [accId, undefined] as const;
          try {
            const data = await AccommodationsApiService.postAccommodationAvailabilityConditions(acc.uniqueName, {
              uniqueTransactionId: acc.uniqueTransactionId as string,
              vendor: acc.vendor as string,
              roomRateIds,
            });
            return [accId, data] as const;
          } catch {
            return [accId, null] as const;
          }
        })
      );

      if (cancelled) return;
      setConditionsByAccommodationId((prev) => ({ ...prev, ...Object.fromEntries(results) }));
      setConditionsLoadingByAccommodationId((prev) => {
        const next = { ...prev };
        for (const [accId] of results) next[accId] = false;
        return next;
      });

      for (const [accId, data] of results) {
        if (data === undefined) continue;
        const ok = data != null && Array.isArray((data as any)?.rates) && ((data as any)?.rates?.length ?? 0) > 0;
        setStatus(accId, ok ? "ok" : "fail");
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [payment?.tripId, payment?.items, accommodationsById]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
        <div className="space-y-5 animate-pulse">
          <div className="h-6 w-40 bg-secondary-100 rounded" />
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-2xl border border-secondary-100 bg-secondary-50 p-4">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-xl bg-secondary-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 bg-secondary-100 rounded" />
                    <div className="h-3 w-5/6 bg-secondary-100 rounded" />
                    <div className="h-3 w-1/3 bg-secondary-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-secondary-100 bg-secondary-50 p-4 space-y-3">
            <div className="h-4 w-28 bg-secondary-100 rounded" />
            <div className="h-10 w-full bg-secondary-100 rounded-xl" />
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
        <h3 className="font-baloo text-lg md:text-xl font-bold text-secondary-900">
          {trip ? "Sua viagem inclui" : "Itens do pagamento"}
        </h3>

        {(payment.items ?? []).map((item, idx) => {
          if (item.type === "ACCOMMODATION") {
            if (!payment.tripId) {
              return (
                <div key={`acc:missingTrip:${item.domainId}:${idx}`} className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-baloo text-lg font-bold text-secondary-900">Hospedagem</p>
                      <p className="font-comfortaa text-sm text-secondary-600 mt-1">
                        Detalhes da hospedagem disponíveis apenas quando há uma viagem associada ao pagamento.
                      </p>
                    </div>
                    <p className="shrink-0 font-baloo text-lg font-bold text-secondary-900 tabular-nums">
                      {formatCurrencyBRL(item.amount)}
                    </p>
                  </div>
                </div>
              );
            }

            const acc = accommodationsById[item.domainId] ?? null;
            const cond = conditionsByAccommodationId[item.domainId];
            const isLoadingConditions = conditionsLoadingByAccommodationId[item.domainId] === true;
            const condByRateId = new Map((cond?.rates ?? []).map((r) => [r.roomRateId || r.id, r]));
            const hasAnyConditionsRate = cond != null && Array.isArray(cond?.rates) && (cond?.rates?.length ?? 0) > 0;
            const accommodationMoreInfoHtml = (() => {
              const rates = cond?.rates;
              if (!Array.isArray(rates) || rates.length === 0) return null;
              const firstWithInfo = rates.find((r) => Boolean((r as any)?.moreInformation));
              return prepareMoreInformationHtml((firstWithInfo as any)?.moreInformation);
            })();
            return (
              <div key={`acc:${item.domainId}:${idx}`} className="space-y-0">
                <div className="rounded-t-2xl border border-secondary-200 bg-white shadow-sm overflow-hidden">
                  <div className="relative w-full h-40 bg-secondary-100">
                    {imageUrl(acc?.coverImage) ? (
                      <Image
                        src={imageUrl(acc?.coverImage) as string}
                        alt={acc?.name ?? "Hospedagem"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 520px"
                      />
                    ) : null}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
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
                      <p className="shrink-0 font-baloo text-lg font-bold text-secondary-900 tabular-nums">
                        {formatCurrencyBRL(item.amount)}
                      </p>
                    </div>

                    {(Array.isArray((acc as any)?.tags) && (acc as any).tags.length > 0) ||
                    (Array.isArray((acc as any)?.recommendedFor) && (acc as any).recommendedFor.length > 0) ? (
                      <div className="mt-3 flex flex-wrap gap-2">
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

                  <div className="border-t border-secondary-100 p-5 space-y-3">
                    {acc?.uniqueTransactionId && isLoadingConditions ? (
                      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                        <div className="flex items-start gap-3">
                          <div
                            className="mt-0.5 h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"
                            aria-hidden
                          />
                          <div className="font-comfortaa text-sm text-blue-900">
                            <p className="font-semibold">Atualizando condições da reserva</p>
                            <p className="mt-1 text-xs leading-relaxed text-blue-800">
                              Valor, cancelamento e regras podem mudar em tempo real.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {!acc?.uniqueTransactionId ? (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-comfortaa text-sm text-amber-900">
                        <p className="font-semibold">Reserva precisa ser refeita</p>
                        <p className="mt-1 text-xs leading-relaxed text-amber-800">
                          Não encontramos o identificador da transação desta hospedagem.
                        </p>
                      </div>
                    ) : null}

                    {acc?.uniqueTransactionId && !isLoadingConditions && cond !== undefined && !hasAnyConditionsRate ? (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-comfortaa text-sm text-amber-900">
                        <p className="font-semibold">Não foi possível validar a reserva</p>
                        <p className="mt-1 text-xs leading-relaxed text-amber-800">
                          A tarifa pode não estar disponível no momento. Volte e tente novamente.
                        </p>
                      </div>
                    ) : null}

                    <div className="space-y-3">
                      {(acc?.rooms ?? []).map((r) => {
                        const live = condByRateId.get(r.rateId) ?? null;
                        const includedTaxes = Array.isArray((live as any)?.includedTaxes)
                          ? ((live as any).includedTaxes as any[])
                          : [];
                        const propertyTaxes = Array.isArray((live as any)?.propertyTaxes)
                          ? ((live as any).propertyTaxes as any[])
                          : [];
                        const rateMealPlan = live ? mealPlanLabel(live) : null;
                        const mealPlanText = live ? rateMealPlan : "Sem café da manhã";
                        const roomAdults = typeof (r as any)?.adults === "number" ? (r as any).adults : null;
                        const roomChildren = typeof (r as any)?.children === "number" ? (r as any).children : null;
                        const stayStart = asDate((acc as any)?.startDate);
                        const stayEnd = asDate((acc as any)?.endDate);
                        const stayStartLabel = stayStart ? stayStart.toLocaleDateString("pt-BR") : null;
                        const stayEndLabel = stayEnd ? stayEnd.toLocaleDateString("pt-BR") : null;

                        return (
                          <div key={r.rateId} className="w-full rounded-xl border border-secondary-200 bg-white p-4">
                            <div className="flex items-start gap-3">
                              <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-secondary-100 shrink-0">
                                {imageUrl(r.coverImage) ? (
                                  <Image
                                    src={imageUrl(r.coverImage) as string}
                                    alt={r.name}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                ) : null}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-comfortaa font-semibold text-secondary-900 truncate">{r.name}</p>
                                {roomAdults != null || roomChildren != null ? (
                                  <p className="font-comfortaa mt-1 text-xs text-secondary-600">
                                    <span className="font-semibold">Ocupação</span>:{" "}
                                    <span className="tabular-nums">
                                      {roomAdults != null
                                        ? `${roomAdults} adulto${roomAdults === 1 ? "" : "s"}`
                                        : ""}
                                      {roomAdults != null && roomChildren != null ? " · " : ""}
                                      {roomChildren != null
                                        ? `${roomChildren} criança${roomChildren === 1 ? "" : "s"}`
                                        : ""}
                                    </span>
                                  </p>
                                ) : null}
                                {stayStartLabel || stayEndLabel ? (
                                  <p className="font-comfortaa mt-1 text-xs text-secondary-600">
                                    <span className="font-semibold">Estadia</span>: {stayStartLabel ?? "—"} →{" "}
                                    {stayEndLabel ?? "—"}
                                  </p>
                                ) : null}
                                <p
                                  className={
                                    live && (live.isAllInclusive || live.hasFullBoard || live.hasHalfBoard || live.hasBreakfast)
                                      ? "font-comfortaa mt-1 text-xs font-semibold text-accent-600"
                                      : "font-comfortaa mt-1 text-xs text-secondary-600"
                                  }
                                >
                                  {mealPlanText}
                                </p>
                              </div>
                            </div>

                            {live ? (
                              <div className="mt-4 border-t border-secondary-100 pt-4 font-comfortaa text-sm text-secondary-800 space-y-1">
                                <p>
                                  <span className="font-semibold">Valor agora</span>:{" "}
                                  {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: live.currency || "BRL",
                                  }).format(live.price)}
                                </p>
                                {live.cancellationPolicy ? (
                                  <p className={live.isCancellable ? "text-green-700" : "text-red-700"}>
                                    {live.cancellationPolicy}
                                  </p>
                                ) : null}

                                {includedTaxes.length > 0 ? (
                                  <div className="mt-2 rounded-lg border border-secondary-100 bg-secondary-50/70 px-3 py-2">
                                    <p className="text-xs font-semibold text-secondary-700 mb-2">Taxas incluídas</p>
                                    <ul className="space-y-1 text-xs text-secondary-700">
                                      {includedTaxes.map((t: any, i: number) => (
                                        <li
                                          key={i}
                                          className={`flex gap-3 ${t.description?.trim() ? "justify-between" : "justify-end"}`}
                                        >
                                          {t.description?.trim() ? (
                                            <span className="min-w-0 text-left">{String(t.description).trim()}</span>
                                          ) : null}
                                          <span className="font-medium shrink-0 tabular-nums">
                                            {new Intl.NumberFormat("pt-BR", {
                                              style: "currency",
                                              currency: live.currency || "BRL",
                                            }).format(Number(t.amount ?? 0))}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null}

                                {propertyTaxes.length > 0 ? (
                                  <div className="mt-2 rounded-lg border border-secondary-100 bg-secondary-50/70 px-3 py-2">
                                    <p className="text-xs font-semibold text-secondary-700 mb-2">
                                      Taxas a serem pagas na hospedagem
                                    </p>
                                    <ul className="space-y-1 text-xs text-secondary-700">
                                      {propertyTaxes.map((t: any, i: number) => (
                                        <li
                                          key={i}
                                          className={`flex gap-3 ${t.description?.trim() ? "justify-between" : "justify-end"}`}
                                        >
                                          {t.description?.trim() ? (
                                            <span className="min-w-0 text-left">{String(t.description).trim()}</span>
                                          ) : null}
                                          <span className="font-medium shrink-0 tabular-nums">
                                            {new Intl.NumberFormat("pt-BR", {
                                              style: "currency",
                                              currency: live.currency || "BRL",
                                            }).format(Number(t.amount ?? 0))}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {accommodationMoreInfoHtml ? (
                  <div
                    className="text-xs max-w-none text-secondary-600 border border-t-0 border-secondary-200 bg-secondary-50/80 px-4 py-3 rounded-b-2xl [&_p]:my-1 [&_*]:whitespace-normal [&_img]:max-w-full [&_img]:h-auto"
                    dangerouslySetInnerHTML={{ __html: accommodationMoreInfoHtml as string }}
                  />
                ) : null}
              </div>
            );
          }

          if (item.type === "SUBSCRIPTION_ESSENTIAL" || item.type === "SUBSCRIPTION_TOTAL") {
            const copy = subscriptionStaticCopy(item.type);
            const badge = priceBadgeFromInstallments(item.amountInInstallments, item.amount);
            return (
              <div key={`sub:${item.type}:${idx}`} className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-baloo text-lg font-bold text-secondary-900">{copy.title}</p>
                  <div className="shrink-0 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <p className="font-baloo text-lg font-bold text-secondary-900 tabular-nums">
                        {formatCurrencyBRL(item.amount)}
                      </p>
                      {badge?.percentOff ? (
                        <span className="inline-flex items-center rounded-full bg-accent-500 text-white px-2 py-0.5 text-[10px] font-baloo font-bold">
                          {badge.percentOff}% OFF
                        </span>
                      ) : null}
                    </div>
                    {badge ? (
                      <p className="font-comfortaa text-[11px] text-secondary-600 mt-1">
                        ou em 12x de{" "}
                        <span className="font-semibold text-secondary-900 tabular-nums">
                          {formatCurrencyBRL(badge.perMonth)}
                        </span>
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="font-comfortaa text-sm text-secondary-600">{copy.description}</p>
                  <ul className="mt-4 space-y-3">
                    {copy.included.map((it, i) => (
                      <li key={i} className="font-comfortaa text-secondary-700 text-sm leading-relaxed">
                        <span className="font-semibold text-secondary-900">{it.title}</span>
                        <span> — {it.description}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-comfortaa text-xs text-secondary-600 mt-4 leading-relaxed">
                    Ao prosseguir com o pagamento, você declara estar ciente e de acordo com os{" "}
                    <Link
                      href={CIRCULO_TERMS.serviceTermsHref}
                      target="_blank"
                      className="text-accent-600 hover:underline font-medium"
                    >
                      {CIRCULO_TERMS.serviceTermsLabel}
                    </Link>{" "}
                    e com os{" "}
                    <Link
                      href={CIRCULO_TERMS.usageTermsHref}
                      target="_blank"
                      className="text-accent-600 hover:underline font-medium"
                    >
                      {CIRCULO_TERMS.usageTermsLabel}
                    </Link>
                    .
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

