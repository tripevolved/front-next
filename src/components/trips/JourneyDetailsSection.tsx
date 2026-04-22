"use client";

import useSWR from "swr";
import Link from "next/link";
import { TripsApiService } from "@/clients/trips";
import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";
import { JourneyAccommodationCard } from "@/components/trips/JourneyAccommodationCard";
import { WhatsAppDirectButton } from "@/components/WhatsAppDirectButton";

export type JourneyDetailsSectionProps = {
  tripId: string;
};

export function JourneyDetailsSection({ tripId }: JourneyDetailsSectionProps) {
  const { data, error, isLoading } = useSWR<TripAccommodationItem[]>(
    tripId ? ["trip-accommodations", tripId] : null,
    () => TripsApiService.getTripAccommodations(tripId),
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
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
                    <div key={j} className="grid gap-3 items-start" style={{ gridTemplateColumns: "20% 80%" }}>
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

  return (
    <div className="space-y-4">
      <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900">Hospedagens</h3>
      {accommodations.map((acc) => (
        <JourneyAccommodationCard key={acc.id} tripId={tripId} accommodation={acc} />
      ))}

      <Link
        href={`/app/viagens/${encodeURIComponent(tripId)}/proposta`}
        className="group flex items-center gap-4 rounded-2xl border-2 border-dashed border-primary-300 bg-primary-50 hover:border-primary-500 hover:bg-primary-100 transition-colors px-6 py-5 shadow-sm"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
          <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
      </Link>

      <div className="flex justify-center pt-2">
        <WhatsAppDirectButton
          message={`Olá! Gostaria de falar com um especialista sobre hospedagens da minha viagem (${tripId}).`}
          variant="naked"
        >
          Falar com um especialista
        </WhatsAppDirectButton>
      </div>
    </div>
  );
}

