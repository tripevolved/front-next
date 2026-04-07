"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { TripsApiService } from "@/clients/trips";
import { AccommodationsApiService } from "@/clients/accommodations";
import { CircleLoader } from "@/components/common/CircleLoader";
import type { TripDetails } from "@/core/types";
import type { AccommodationAvailabilityConditionsResponse } from "@/core/types/accommodations";
import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import type { TripPriceResponse } from "@/clients/trips/price";

function asDate(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "string" && value.trim() !== "") {
    // When backend sends date-only (YYYY-MM-DD), parse as local date to avoid timezone shifts.
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

function hospedagemPath(uniqueName: string): string {
  return `/hospedagens/${encodeURIComponent(uniqueName)}`;
}

function imageUrl(img?: { url: string } | null): string | null {
  const u = img?.url?.trim();
  return u ? u : null;
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

function formatMoneyPtBR(amount: number, currency?: string | null): string {
  const c = currency || "BRL";
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: c }).format(amount);
  } catch {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount);
  }
}

export function CheckoutTripById({
  tripId,
  initialTrip,
}: {
  tripId: string;
  initialTrip: TripDetails;
}) {
  const [trip, setTrip] = useState<TripDetails>(initialTrip);
  const [items, setItems] = useState<TripAccommodationItem[] | null>(null);
  const [conditionsByIdx, setConditionsByIdx] = useState<
    (AccommodationAvailabilityConditionsResponse | null | undefined)[]
  >([]);
  const [conditionsLoadingByIdx, setConditionsLoadingByIdx] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<TripPriceResponse | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  const dateLabel = useMemo(() => {
    const start = asDate(trip?.configuration?.startDate);
    const end = asDate(trip?.configuration?.endDate);
    if (!start || !end) return null;
    return formatTripDateRangePtBR(start, end);
  }, [trip]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setTrip(initialTrip);
    setItems(null);
    setConditionsByIdx([]);
    setConditionsLoadingByIdx([]);

    const run = async () => {
      try {
        const accommodations = await TripsApiService.getTripAccommodations(tripId);
        if (cancelled) return;
        setItems(accommodations);
        setConditionsByIdx(new Array(accommodations.length).fill(undefined));
        setConditionsLoadingByIdx(new Array(accommodations.length).fill(false));
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Não foi possível carregar o checkout. Tente novamente em instantes.");
          setLoading(false);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [tripId, initialTrip]);

  useEffect(() => {
    if (!items || items.length === 0) return;

    let cancelled = false;

    const loadConditions = async () => {
      // mark loading for items that can fetch
      setConditionsLoadingByIdx((prev) => {
        const next = items.map((a, idx) => {
          const uniqueTransactionId = a.uniqueTransactionId ?? null;
          const roomRateIds = a.rooms.map((r) => r.rateId).filter(Boolean);
          const canFetch = !!uniqueTransactionId && !!a.uniqueName && !!a.vendor && roomRateIds.length > 0;
          return canFetch ? true : prev[idx] ?? false;
        });
        return next;
      });

      const results = await Promise.all(
        items.map(async (a) => {
          const uniqueTransactionId = a.uniqueTransactionId ?? null;
          const roomRateIds = a.rooms.map((r) => r.rateId).filter(Boolean);

          if (!uniqueTransactionId) return undefined;
          if (!a.uniqueName || !a.vendor || roomRateIds.length === 0) return undefined;

          try {
            return await AccommodationsApiService.postAccommodationAvailabilityConditions(
              a.uniqueName,
              {
                uniqueTransactionId,
                vendor: a.vendor,
                roomRateIds,
              }
            );
          } catch {
            return null;
          }
        })
      );

      if (cancelled) return;
      setConditionsByIdx(results);
      setConditionsLoadingByIdx(items.map(() => false));
    };

    // Run after initial render; keeps list visible while conditions load.
    Promise.resolve().then(loadConditions);

    return () => {
      cancelled = true;
    };
  }, [items]);

  useEffect(() => {
    let cancelled = false;
    setPriceLoading(true);
    setPriceError(null);

    TripsApiService.postTripPrice(tripId)
      .then((data) => {
        if (cancelled) return;
        setPriceData(data);
        setPriceError(data.hasError ? data.errorMessage ?? "Não foi possível obter o valor." : null);
      })
      .catch(() => {
        if (!cancelled) setPriceError("Não foi possível obter o valor. Tente novamente.");
      })
      .finally(() => {
        if (!cancelled) setPriceLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tripId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-10">
        <CircleLoader />
        <div className="max-w-md text-center space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">Carregando checkout</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Estamos buscando os dados da sua viagem e atualizando as condições em tempo real.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
        <div className="max-w-md w-full rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-red-900">
          <p className="text-sm font-medium leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{trip.title}</h1>
          {trip.destination ? (
            <p className="text-sm md:text-base text-gray-700">
              <span className="font-semibold">A sua viagem para </span>{trip.destination}
            </p>
          ) : null}
          {dateLabel ? (
            <p className="text-sm md:text-base text-gray-700">
              {dateLabel}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Hospedagens</h2>

        {(items ?? []).map((a, idx) => {
          const cond = conditionsByIdx[idx];
          const condByRateId = new Map((cond?.rates ?? []).map((r) => [r.roomRateId || r.id, r]));
          const uniqueTransactionId = a.uniqueTransactionId ?? null;
          const validUntil = asDate(a.uniqueTransactionIdValidUntil);
          const isExpired = validUntil ? validUntil.getTime() < Date.now() : false;
          const hasAnyConditionsRate =
            cond != null && Array.isArray(cond?.rates) && (cond?.rates?.length ?? 0) > 0;
          const isLoadingConditions = conditionsLoadingByIdx[idx] === true;
          const accommodationMoreInfoHtml = (() => {
            const rates = cond?.rates;
            if (!Array.isArray(rates) || rates.length === 0) return null;
            const firstWithInfo = rates.find((r) => Boolean((r as any)?.moreInformation));
            return prepareMoreInformationHtml((firstWithInfo as any)?.moreInformation);
          })();

          return (
            <div key={`${a.id}:${a.uniqueName}`}>
              <div
                className="rounded-t-2xl border border-gray-200 bg-white overflow-hidden shadow-sm"
              >
              <div
                className="md:grid"
                style={{ gridTemplateColumns: "45% 55%" }}
              >
                {/* Left column (desktop): image + title/address */}
                <div className="md:border-r md:border-gray-100">
                  <div className="relative w-full h-44 md:h-48 bg-gray-100">
                    {imageUrl(a.coverImage) ? (
                      <Image
                        src={imageUrl(a.coverImage) as string}
                        alt={a.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 288px"
                      />
                    ) : null}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900">{a.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{a.fullAddress}</p>
                  </div>
                </div>

                {/* Right column: conditions + rooms */}
                <div className="min-w-0 border-t border-gray-100 p-5 space-y-3 md:border-t-0 overflow-hidden">
                {uniqueTransactionId && isLoadingConditions ? (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"
                        aria-hidden
                      />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold">Buscando condições da reserva</p>
                        <p className="mt-1 text-xs leading-relaxed text-blue-800">
                          Atualizando valor, cancelamento e regras da tarifa em tempo real.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {!uniqueTransactionId ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <p className="font-semibold">Reserva precisa ser refeita</p>
                    <p className="mt-1 text-xs leading-relaxed text-amber-800">
                      Não encontramos o identificador da transação desta hospedagem. Volte para a página
                      da hospedagem e refaça a busca para reservar novamente.
                    </p>
                    <a
                      href={hospedagemPath(a.uniqueName)}
                      className="mt-2 inline-flex font-semibold underline underline-offset-2 hover:opacity-90"
                    >
                      Ir para a hospedagem
                    </a>
                  </div>
                ) : null}

                {uniqueTransactionId && !isLoadingConditions && cond !== undefined && !hasAnyConditionsRate ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <p className="font-semibold">
                      {isExpired ? "Esta reserva expirou" : "Não foi possível validar a reserva"}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-amber-800">
                      {isExpired
                        ? "A transação desta hospedagem passou da validade. Volte para a hospedagem e refaça a reserva."
                        : "A tarifa que você escolheu não está disponível no momento. Volte para a hospedagem e tente reservar novamente."}
                    </p>
                    <a
                      href={hospedagemPath(a.uniqueName)}
                      className="mt-2 inline-flex font-semibold underline underline-offset-2 hover:opacity-90"
                    >
                      Ir para a hospedagem
                    </a>
                  </div>
                ) : null}

                {a.rooms.map((r) => {
                  const live = condByRateId.get(r.rateId) ?? null;
                  const propertyTaxes = Array.isArray(live?.propertyTaxes) ? live!.propertyTaxes! : [];
                  return (
                    <div key={r.rateId} className="w-full rounded-xl border border-gray-200 bg-white p-4">
                      <div className="flex items-start gap-3">
                        <div className="relative h-16 w-16 sm:h-18 sm:w-18 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {imageUrl(r.coverImage) ? (
                            <Image
                              src={imageUrl(r.coverImage) as string}
                              alt={r.name}
                              fill
                              className="object-cover"
                              sizes="72px"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 truncate">{r.name}</p>
                          {r.description ? (
                            <div
                              className="mt-1 prose prose-sm max-w-none text-gray-600 line-clamp-2 [&_*]:text-gray-600"
                              dangerouslySetInnerHTML={{ __html: r.description }}
                            />
                          ) : null}

                          {live ? (
                            <div className="mt-3 text-sm text-gray-800 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                {live.isSpecialOffer ? (
                                  <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800 border border-purple-200">
                                    Oferta especial
                                  </span>
                                ) : null}
                              </div>
                              <p>
                                <span className="font-semibold">Valor agora</span>:{" "}
                                {formatMoneyPtBR(live.price, live.currency)}
                              </p>
                              {live.cancellationPolicy ? (
                                <p className={live.isCancellable ? "text-green-700" : "text-red-700"}>
                                  {live.cancellationPolicy}
                                </p>
                              ) : null}

                              {(live.checkInTime || live.checkOutTime) ? (
                                <p className="text-xs text-gray-600">
                                  <span className="font-semibold">Horários</span>:
                                  {live.checkInTime ? ` check-in ${live.checkInTime}` : ""}
                                  {live.checkOutTime ? ` · check-out ${live.checkOutTime}` : ""}
                                </p>
                              ) : null}

                              {propertyTaxes.length > 0 ? (
                                <div className="mt-2 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2">
                                  <p className="text-xs font-semibold text-gray-700 mb-2">
                                    Taxas do estabelecimento
                                  </p>
                                  <ul className="space-y-1 text-xs text-gray-700">
                                    {propertyTaxes.map((t: any, i: number) => (
                                      <li
                                        key={i}
                                        className={`flex gap-3 ${
                                          t.description?.trim() ? "justify-between" : "justify-end"
                                        }`}
                                      >
                                        {t.description?.trim() ? (
                                          <span className="min-w-0 text-left">
                                            {String(t.description).trim()}
                                          </span>
                                        ) : null}
                                        <span className="font-medium shrink-0 tabular-nums">
                                          {formatMoneyPtBR(Number(t.amount ?? 0), live.currency)}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
              </div>

              {accommodationMoreInfoHtml ? (
                <div
                  className="text-xs max-w-none text-gray-600 border border-t-0 border-gray-200 bg-gray-50/80 px-4 py-3 rounded-b-2xl [&_p]:my-1 [&_*]:whitespace-normal [&_img]:max-w-full [&_img]:h-auto"
                  dangerouslySetInnerHTML={{ __html: accommodationMoreInfoHtml as string }}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">Resumo da sua viagem</h2>
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          {priceLoading ? (
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">Calculando o total</p>
                <p className="mt-1 text-xs text-gray-600">
                  Estamos buscando as melhores condições e calculando as economias sem comissões.
                </p>
              </div>
            </div>
          ) : priceError ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
              <p className="text-sm font-semibold">Não foi possível calcular o valor total</p>
              <p className="mt-1 text-xs leading-relaxed text-amber-800">{priceError}</p>
            </div>
          ) : priceData ? (
            <div className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-semibold text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900 tabular-nums">
                  {formatMoneyPtBR(priceData.price, "BRL")}
                </p>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-semibold text-gray-900">Economia</p>
                <p className="text-sm font-semibold text-green-700 tabular-nums">
                  {formatMoneyPtBR(priceData.savings, "BRL")}
                </p>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Você está evitando comissões e economizando até{" "}
                <span className="font-semibold">{formatMoneyPtBR(priceData.savings, "BRL")}</span>.
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Valor indisponível.</p>
          )}
        </div>
      </div>
    </div>
  );
}

