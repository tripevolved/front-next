"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TripsApiService } from "@/clients/trips";
import type { TripDetails } from "@/core/types";
import { CircleLoader } from "@/components/common/CircleLoader";

function formatMaybeDate(d: unknown): string {
  if (!d) return "";
  const asDate = d instanceof Date ? d : new Date(String(d));
  if (Number.isNaN(asDate.getTime())) return "";
  return asDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ViagemByIdPage() {
  const params = useParams<{ id: string }>();
  const tripId = params?.id ?? "";

  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setTrip(null);

    TripsApiService.getTripDetailsById(tripId)
      .then((t) => {
        if (!cancelled) setTrip(t);
      })
      .catch(() => {
        if (!cancelled) setError("Não foi possível carregar a viagem.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tripId]);

  const dateRange = useMemo(() => {
    const start = formatMaybeDate((trip as any)?.configuration?.startDate);
    const end = formatMaybeDate((trip as any)?.configuration?.endDate);
    if (start && end) return `${start} — ${end}`;
    return start || end || "";
  }, [trip]);

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        <header className="space-y-2">
          <p className="font-comfortaa text-xs text-secondary-500">
            <Link href="/app" className="hover:underline">
              App
            </Link>{" "}
            /{" "}
            <Link href="/app/viagens" className="hover:underline">
              Viagens
            </Link>
          </p>
          <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">Viagem</h1>
        </header>

        {loading ? (
          <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-5 py-6">
              <CircleLoader className="h-20 w-20" />
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold text-secondary-900">Carregando viagem</p>
                <p className="font-comfortaa text-xs text-secondary-600">Buscando os detalhes da sua viagem.</p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-comfortaa text-sm text-red-800">{error}</p>
            <div className="pt-5">
              <Link
                href="/app"
                className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 transition-all inline-flex items-center justify-center"
              >
                Voltar ao app
              </Link>
            </div>
          </div>
        ) : trip ? (
          <section className="rounded-2xl border border-secondary-200 bg-white p-6 md:p-8 shadow-sm space-y-5">
            <div className="space-y-1">
              <h2 className="font-baloo text-xl font-bold text-secondary-900">{trip.title}</h2>
              {trip.destination ? (
                <p className="font-comfortaa text-secondary-600">{trip.destination}</p>
              ) : null}
              {dateRange ? <p className="font-comfortaa text-sm text-secondary-700">{dateRange}</p> : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
                <p className="font-comfortaa text-xs text-secondary-500">Viajantes</p>
                <p className="font-comfortaa text-secondary-900 font-semibold tabular-nums mt-1">
                  {trip.configuration?.numAdults ?? 0} adultos • {trip.configuration?.numChildren ?? 0} crianças
                </p>
              </div>
              <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
                <p className="font-comfortaa text-xs text-secondary-500">Orçamento</p>
                <p className="font-comfortaa text-secondary-900 font-semibold tabular-nums mt-1">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                    trip.configuration?.budget ?? 0
                  )}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href={`/app/viagens/${trip.id}/checkout`}
                className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors border border-secondary-200"
              >
                Ver checkout
              </Link>
              <Link
                href="/app"
                className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 transition-all inline-flex items-center justify-center"
              >
                Voltar ao app
              </Link>
            </div>
          </section>
        ) : (
          <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
            <p className="font-comfortaa text-secondary-700">Viagem não encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}

