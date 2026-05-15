"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { TripsApiService } from "@/clients/trips";
import type { TripItinerary } from "@/core/types/itinerary";
import { mapTripItineraryActions } from "@/components/itineraries/mapTripItineraryToItems";
import { ItineraryScrollProvider } from "@/components/itineraries/ItineraryScrollContext";
import { ItineraryDayByDaySection } from "@/components/itineraries/ItineraryDayByDaySection";
import {
  buildJourneyAccommodationHref,
  ItineraryItemSections,
} from "@/components/itineraries/ItineraryItemSections";
import { JourneyDetailsSection } from "@/components/trips/JourneyDetailsSection";
import { CircleLoader } from "@/components/common/CircleLoader";

const EMPTY_STATE_IMAGE = "/assets/states/empty-state.svg";

export type TripItineraryBuilderProps = {
  tripId: string;
  destination?: string;
  relatedDestinationUniqueName?: string;
};

function hasItineraryContent(data: TripItinerary | undefined | null): boolean {
  return Boolean(data && Array.isArray(data.actions) && data.actions.length > 0);
}

export function TripItineraryBuilder({
  tripId,
  destination,
  relatedDestinationUniqueName,
}: TripItineraryBuilderProps) {
  const [createdItinerary, setCreatedItinerary] = useState<TripItinerary | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const swrKey = tripId ? `trip-itinerary-${tripId}` : null;
  const { data: fetchedItinerary, error, isLoading, mutate } = useSWR(
    swrKey,
    () => TripsApiService.getItinerary(tripId),
    { revalidateOnFocus: false }
  );

  const activeItinerary = createdItinerary ?? fetchedItinerary ?? null;
  const itineraryItems = useMemo(
    () => mapTripItineraryActions(activeItinerary?.actions),
    [activeItinerary?.actions]
  );
  const mapImageUrl = activeItinerary?.descriptionImage?.url;
  const showCreateCta = !isLoading && (Boolean(error) || !hasItineraryContent(activeItinerary));

  const handleCreateItinerary = useCallback(async () => {
    if (!tripId || creating) return;
    setCreating(true);
    setCreateError(null);
    try {
      const created = await TripsApiService.createItinerary(tripId);
      setCreatedItinerary(created);
      await mutate(created, { revalidate: false });
    } catch {
      setCreateError("Não foi possível criar o itinerário. Tente novamente.");
    } finally {
      setCreating(false);
    }
  }, [tripId, creating, mutate]);

  if (isLoading) {
    return (
      <section id="itinerary" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-[80%] mx-auto flex flex-col items-center justify-center min-h-[320px] gap-4">
          <CircleLoader className="h-12 w-12" />
          <p className="text-secondary-600 font-comfortaa text-sm">Carregando itinerário...</p>
        </div>
      </section>
    );
  }

  if (showCreateCta) {
    return (
      <section id="itinerary" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-[80%] mx-auto flex flex-col items-center gap-6 text-center px-4">
          <Image src={EMPTY_STATE_IMAGE} alt="" width={240} height={240} className="object-contain" />
          <div className="space-y-2 max-w-md">
            <h2 className="font-baloo text-2xl font-bold text-secondary-900">Monte seu itinerário</h2>
            <p className="font-comfortaa text-sm text-secondary-600">
              {error
                ? "Não encontramos um itinerário para esta viagem. Crie um novo para começar a organizar sua jornada."
                : "Sua viagem ainda não tem um itinerário. Crie um para começar a montar o roteiro dia a dia."}
            </p>
          </div>
          {createError ? (
            <p className="text-sm text-red-600 font-comfortaa">{createError}</p>
          ) : null}
          <button
            type="button"
            onClick={handleCreateItinerary}
            disabled={creating}
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white px-6 py-3 rounded-full font-baloo font-semibold transition-colors"
          >
            {creating ? "Criando itinerário..." : "Criar itinerário"}
          </button>
        </div>
      </section>
    );
  }

  if (itineraryItems.length === 0) {
    return null;
  }

  return (
    <>
      <ItineraryScrollProvider itinerary={itineraryItems}>
        <ItineraryDayByDaySection mapImage={mapImageUrl} type="period" />
        <ItineraryItemSections type="period" accommodationDetailsHref={buildJourneyAccommodationHref} />
      </ItineraryScrollProvider>

      <section id="journey-details" className="md:max-w-[80%] mx-auto px-4 py-12 scroll-mt-24">
        <h2 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 mb-6">
          Detalhes da jornada
        </h2>
        <JourneyDetailsSection
          tripId={tripId}
          destination={destination}
          relatedDestinationUniqueName={relatedDestinationUniqueName}
          showAddAccommodation={false}
        />
      </section>
    </>
  );
}
