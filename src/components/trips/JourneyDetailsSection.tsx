"use client";

import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TripsApiService } from "@/clients/trips";
import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import type { TripPriceResponse } from "@/clients/trips/price";
import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";
import { JourneyAccommodationCard } from "@/components/trips/JourneyAccommodationCard";
import { WhatsAppDirectButton } from "@/components/WhatsAppDirectButton";
import { AddAccommodationDrawer } from "@/components/trips/AddAccommodationDrawer";
import type { TripDetails } from "@/core/types/trip";
import { TravelerType } from "@/core/types/trip";
import type { AccommodationAvailabilityQuery, TravelerInput } from "@/clients/accommodations";

export type JourneyDetailsSectionProps = {
  tripId: string;
  destination?: string;
  relatedDestinationUniqueName?: string;
};

function formatMoneyPtBR(amount: number, currency?: string | null): string {
  const c = currency || "BRL";
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: c }).format(amount);
  } catch {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount);
  }
}

export function JourneyDetailsSection({ tripId, destination, relatedDestinationUniqueName }: JourneyDetailsSectionProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR<TripAccommodationItem[]>(
    tripId ? ["trip-accommodations", tripId] : null,
    () => TripsApiService.getTripAccommodations(tripId),
    { revalidateOnFocus: false }
  );
  const { data: tripDetails } = useSWR<TripDetails>(
    tripId ? ["trip-details", tripId] : null,
    () => TripsApiService.getTripDetailsById(tripId),
    { revalidateOnFocus: false }
  );
  const { data: tripPrice } = useSWR<TripPriceResponse>(
    tripId ? ["trip-price", tripId] : null,
    () => TripsApiService.postTripPrice(tripId),
    { revalidateOnFocus: false }
  );

  const travelerQuery: AccommodationAvailabilityQuery = useMemo(() => {
    const cfg = tripDetails?.configuration;
    const isFamily = cfg?.travelerType === TravelerType.FAMILY || (cfg?.numChildren ?? 0) > 0;
    const adults = Math.max(1, cfg?.numAdults ?? 2);
    const children = Math.max(0, cfg?.numChildren ?? 0);
    const childrenAges = Array.isArray(cfg?.childrenAges) ? cfg!.childrenAges : [];
    const roomsFromTrip =
      Array.isArray(cfg?.rooms) && cfg!.rooms.length > 0
        ? cfg!.rooms.map((r) => ({
            adults: r.numAdults,
            children: r.numChildren,
            childrenAges: r.childrenAges ?? [],
          }))
        : [
            {
              adults,
              children,
              childrenAges,
            },
          ];

    const travelerInput: TravelerInput = isFamily
      ? {
          type: "FAMILY",
          adults,
          children,
          childrenAges,
          rooms: roomsFromTrip,
        }
      : {
          type: "COUPLE",
          adults: 2,
          children: 0,
          childrenAges: [],
          rooms: [{ adults: 2, children: 0, childrenAges: [] }],
        };

    return { travelerInput };
  }, [tripDetails?.configuration]);

  if (isLoading) {
    return (
      <div className="relative">
        <div className="lg:grid lg:grid-cols-[1fr,320px] lg:gap-8">
          <div className="space-y-4 pb-28 lg:pb-0">
            <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900">Hospedagens</h3>

            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-secondary-200 bg-white shadow-sm overflow-hidden animate-pulse"
              >
                <div className="md:grid" style={{ gridTemplateColumns: "45% 55%" }}>
                  <div className="border-b md:border-b-0 md:border-r border-secondary-100">
                    <div className="w-full h-44 md:h-52 bg-secondary-100" />
                    <div className="p-5 md:p-6 space-y-3">
                      <div className="h-6 w-2/3 bg-secondary-100 rounded" />
                      <div className="h-4 w-5/6 bg-secondary-100 rounded" />
                      <div className="h-4 w-1/2 bg-secondary-100 rounded" />
                      <div className="flex gap-2 pt-2">
                        <div className="h-6 w-20 bg-secondary-100 rounded-full" />
                        <div className="h-6 w-24 bg-secondary-100 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="h-5 w-28 bg-secondary-100 rounded" />
                    <div className="mt-4 space-y-4">
                      {[0, 1].map((j) => (
                        <div
                          key={j}
                          className="grid gap-3 items-start"
                          style={{ gridTemplateColumns: "20% 80%" }}
                        >
                          <div className="w-full aspect-square bg-secondary-100 rounded-lg" />
                          <div className="space-y-2">
                            <div className="h-4 w-2/3 bg-secondary-100 rounded" />
                            <div className="flex gap-2">
                              <div className="h-6 w-24 bg-secondary-100 rounded-full" />
                              <div className="h-6 w-20 bg-secondary-100 rounded-full" />
                            </div>
                            <div className="h-3 w-1/2 bg-secondary-100 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop sticky summary skeleton */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm animate-pulse">
                <div className="h-5 w-24 bg-secondary-100 rounded" />
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-5/6 bg-secondary-100 rounded" />
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="h-4 w-16 bg-secondary-100 rounded" />
                    <div className="h-6 w-24 bg-secondary-100 rounded" />
                  </div>
                </div>
                <div className="mt-5 h-11 w-full rounded-xl bg-secondary-100" />
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile fixed bottom bar skeleton */}
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-secondary-200 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-4 animate-pulse">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="h-3 w-24 bg-secondary-100 rounded" />
                <div className="mt-2 h-5 w-28 bg-secondary-100 rounded" />
                <div className="mt-2 h-3 w-32 bg-secondary-100 rounded" />
              </div>
              <div className="h-11 w-28 rounded-xl bg-secondary-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyOrErrorState
        status="error"
        title="Não foi possível carregar os detalhes da jornada"
        description="Tente novamente em alguns instantes."
      />
    );
  }

  const accommodations = data ?? [];
  if (accommodations.length === 0) {
    return (
      <EmptyOrErrorState
        status="empty"
        title="Nenhuma hospedagem encontrada"
        description="Quando as acomodações estiverem disponíveis, elas aparecerão aqui."
      />
    );
  }

  const priceHasError = tripPrice?.hasError === true;
  const canShowPrice = tripPrice != null && !priceHasError && typeof tripPrice.price === "number";
  const canShowSavings = tripPrice != null && !priceHasError && typeof tripPrice.savings === "number";
  const paidAmount =
    tripPrice != null && !priceHasError && typeof (tripPrice as any).paidAmount === "number"
      ? (tripPrice as any).paidAmount
      : 0;
  const paidSavings =
    tripPrice != null && !priceHasError && typeof (tripPrice as any).paidSavings === "number"
      ? (tripPrice as any).paidSavings
      : 0;
  const remainingToPay = canShowPrice ? Math.max(0, tripPrice!.price) : null;
  const totalTripAmount = canShowPrice ? Math.max(0, tripPrice!.price + (paidAmount || 0)) : null;
  const totalTripSavings = canShowSavings ? Math.max(0, tripPrice!.savings + (paidSavings || 0)) : null;
  const canCheckout = remainingToPay != null && remainingToPay > 0;

  return (
    <div className="relative">
      {/* Desktop: right sticky column. Mobile: fixed bottom bar. */}
      <div className="lg:grid lg:grid-cols-[1fr,320px] lg:gap-8">
        <div className="space-y-4 pb-28 lg:pb-0">
          <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900">Hospedagens</h3>
          {accommodations.map((acc) => (
            <JourneyAccommodationCard key={acc.id} tripId={tripId} accommodation={acc} />
          ))}

          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="group w-full flex items-center gap-4 rounded-2xl border-2 border-dashed border-primary-300 bg-primary-50 hover:border-primary-500 hover:bg-primary-100 transition-colors px-6 py-5 shadow-sm"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-comfortaa text-xs md:text-sm text-secondary-600 mt-1">
                Sua jornada ainda não está completa?
              </p>
              <p className="font-baloo font-semibold text-primary-700 text-sm md:text-base">
                Adicionar uma nova hospedagem
              </p>
            </div>
          </button>

          <div className="flex justify-center pt-2">
            <WhatsAppDirectButton
              message={`Olá! Gostaria de falar com um especialista sobre minha viagem${destination ? ` para ${destination}` : ""}.`}
              variant="naked"
            >
              Falar com um especialista
            </WhatsAppDirectButton>
          </div>

          <AddAccommodationDrawer
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            relatedDestinationUniqueName={relatedDestinationUniqueName}
            travelerQuery={travelerQuery}
            tripId={tripId}
            onTripAccommodationsChanged={() => {
              mutate(["trip-accommodations", tripId]);
              mutate(["trip-details", tripId]);
              mutate(["trip-price", tripId]);
            }}
          />
        </div>

        {/* Desktop sticky summary */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm">
              <p className="font-baloo text-lg font-bold text-secondary-900">Resumo</p>

              <div className="mt-4 space-y-3">
                {canShowSavings ? (
                  <p className="text-sm font-semibold leading-relaxed text-accent-600">
                    Você está evitando comissões e economizando{" "}
                    <span className="tabular-nums">
                      {formatMoneyPtBR((totalTripSavings ?? tripPrice!.savings) as number, "BRL")}
                    </span>
                    .
                  </p>
                ) : null}

                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-semibold text-secondary-900">Total</p>
                  <p className="text-lg font-bold text-secondary-900 tabular-nums">
                    {totalTripAmount != null ? formatMoneyPtBR(totalTripAmount, "BRL") : "—"}
                  </p>
                </div>

                {canShowPrice && paidAmount > 0 ? (
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm font-semibold text-secondary-700">Já pago</p>
                    <p className="text-sm font-bold text-secondary-900 tabular-nums">
                      {formatMoneyPtBR(paidAmount, "BRL")}
                    </p>
                  </div>
                ) : null}

                {remainingToPay != null ? (
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm font-semibold text-secondary-900">Falta pagar</p>
                    <p className="text-lg font-bold text-primary-700 tabular-nums">
                      {formatMoneyPtBR(remainingToPay, "BRL")}
                    </p>
                  </div>
                ) : null}

                {priceHasError ? (
                  <p className="text-xs text-amber-700">{tripPrice?.errorMessage || "Valor indisponível."}</p>
                ) : null}
              </div>

              {canCheckout ? (
                <Link
                  href={`/app/viagens/${encodeURIComponent(tripId)}/checkout`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
                >
                  Validar e reservar jornada
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-secondary-200 px-4 py-3 text-center text-sm font-semibold text-secondary-600 shadow-sm cursor-not-allowed"
                >
                  Tudo pago
                </button>
              )}

              <p className="mt-3 text-xs text-secondary-600 leading-relaxed">
                Confira as condições e reserve sua jornada completa de uma vez.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-secondary-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-secondary-600">Total da viagem</p>
              <p className="text-base font-bold text-secondary-900 tabular-nums">
                {totalTripAmount != null ? formatMoneyPtBR(totalTripAmount, "BRL") : "—"}
              </p>
              {canShowSavings ? (
                <p className="text-xs font-semibold text-accent-600">
                  Economia:{" "}
                  <span className="tabular-nums">
                    {formatMoneyPtBR((totalTripSavings ?? tripPrice!.savings) as number, "BRL")}
                  </span>
                </p>
              ) : null}
              {remainingToPay != null ? (
                <p className="text-xs font-semibold text-primary-700">
                  Falta pagar: <span className="tabular-nums">{formatMoneyPtBR(remainingToPay, "BRL")}</span>
                </p>
              ) : null}
            </div>
            {canCheckout ? (
              <Link
                href={`/app/viagens/${encodeURIComponent(tripId)}/checkout`}
                className="shrink-0 inline-flex items-center justify-center rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
              >
                Reservar
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="shrink-0 inline-flex items-center justify-center rounded-xl bg-secondary-200 px-4 py-3 text-sm font-semibold text-secondary-600 shadow-sm cursor-not-allowed"
              >
                Tudo pago
              </button>
            )}
          </div>
          {priceHasError ? (
            <p className="mt-2 text-xs text-amber-700">{tripPrice?.errorMessage || "Valor indisponível."}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

