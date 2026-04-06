"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useAppStore } from "@/core/store";
import { TripsApiService } from "@/clients/trips";
import type { TripListView } from "@/core/types/trip";

const PLACEHOLDER_IMAGE = "/assets/blank-image.png";

function TripCard({ trip }: { trip: TripListView }) {
  const imageUrl = trip.images?.[0]?.url ?? PLACEHOLDER_IMAGE;
  const href = `/app/viagens/${trip.id}/proposta`;

  return (
    <Link
      href={href}
      className="group relative block aspect-[4/3] min-h-[180px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <Image
        src={imageUrl}
        alt={trip.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <h3 className="font-baloo font-bold text-lg line-clamp-2">{trip.title}</h3>
        {trip.period && (
          <p className="text-sm text-white/90 mt-1">{trip.period}</p>
        )}
        {trip.status && (
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm w-fit">
            {trip.status}
          </span>
        )}
      </div>
    </Link>
  );
}

function PlanNewTripCard() {
  return (
    <Link
      href="/app/viagens/planejar"
      className="group flex flex-col items-center justify-center aspect-[4/3] min-h-[180px] rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 hover:border-primary-500 hover:bg-primary-100 transition-colors"
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-3 group-hover:bg-primary-200 transition-colors">
        <svg
          className="w-7 h-7 text-primary-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <span className="font-baloo font-semibold text-primary-700 text-center">
        Planejar nova viagem
      </span>
    </Link>
  );
}

export function AppTripsCards() {
  const travelerId = useAppStore((state) => state.travelerState?.id ?? "");

  const { data, error, isLoading } = useSWR(
    travelerId ? `trips-all-${travelerId}` : null,
    () => TripsApiService.getTrips()
  );

  const trips = data?.trips ?? [];

  return (
    <section className="mt-10 pt-10 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Minhas viagens</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] min-h-[180px] rounded-xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-xl">
          <p className="text-gray-600 text-center">
            Não foi possível carregar suas viagens. Tente novamente mais tarde.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
          <PlanNewTripCard />
        </div>
      )}
    </section>
  );
}
