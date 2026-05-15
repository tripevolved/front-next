"use client";

import { useMemo } from "react";
import { mapPublicItineraryActions } from "@/components/itineraries/mapPublicItineraryToItems";
import { ItineraryScrollProvider } from "@/components/itineraries/ItineraryScrollContext";
import { ItineraryDayByDaySection } from "@/components/itineraries/ItineraryDayByDaySection";
import { ItineraryItemSections } from "@/components/itineraries/ItineraryItemSections";
import { UniqueMomentsCarousel } from "@/components/uniqueMoments";
import type { UniqueMoment } from "@/core/types/uniqueMoments";
import type { PublicTripItinerary } from "@/core/types/public-itinerary";

function mapPublicUniqueMomentToCarouselMoment(m: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: Array<{ url?: string | null } | null> | null | undefined;
}): UniqueMoment {
  return {
    id: m.id,
    title: m.title,
    subtitle: m.subtitle,
    description: m.description,
    images: (m.images ?? []).map((img) => img?.url).filter((url): url is string => Boolean(url)),
  };
}

export function hasPublicItineraryContent(data: PublicTripItinerary | undefined | null): boolean {
  return Boolean(data && Array.isArray(data.actions) && data.actions.length > 0);
}

export type TripItineraryViewerProps = {
  itinerary: PublicTripItinerary;
};

export function TripItineraryViewer({ itinerary }: TripItineraryViewerProps) {
  const itineraryItems = useMemo(
    () => mapPublicItineraryActions(itinerary.actions),
    [itinerary.actions]
  );
  const mapImageUrl = itinerary.descriptionImage?.url;
  const uniqueMoments: UniqueMoment[] = useMemo(
    () => (itinerary.uniqueMoments ?? []).map(mapPublicUniqueMomentToCarouselMoment),
    [itinerary.uniqueMoments]
  );

  if (itineraryItems.length === 0) {
    return null;
  }

  return (
    <>
      {uniqueMoments.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-[80%] mx-auto">
            <h2 className="text-3xl font-baloo font-bold text-secondary-900 mb-8 text-center">
              Momentos Únicos
            </h2>
            <UniqueMomentsCarousel uniqueMoments={uniqueMoments} />
          </div>
        </section>
      ) : null}

      <ItineraryScrollProvider itinerary={itineraryItems}>
        <ItineraryDayByDaySection mapImage={mapImageUrl} type="period" showFloatingNav={false} />
        <ItineraryItemSections type="period" readOnly />
      </ItineraryScrollProvider>
    </>
  );
}
