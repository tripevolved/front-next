"use client";

import { ItineraryScrollProvider } from "@/components/itineraries/ItineraryScrollContext";
import { ItineraryDayByDaySection } from "@/components/itineraries/ItineraryDayByDaySection";
import { ItineraryItemSections } from "@/components/itineraries/ItineraryItemSections";
import type { Cruise } from "@/core/types/cruise";
import type { PublicTripAccommodation } from "@/core/types/public-itinerary";

export interface ItineraryItem {
  id: number;
  date: string;
  activity: string;
  image: string;
  description: string;
  accommodation?: {
    accommodationId?: string;
    accommodationUniqueName?: string;
    name: string;
    description: string;
    image: string;
    tags?: string[];
    recommendedFor?: string[];
    /** Full public share payload — powers the read-only details modal */
    publicDetails?: PublicTripAccommodation;
  };
  experience?: {
    name: string;
    description: string;
    image: string;
  };
  cruise?: Cruise;
  highlights: {
    description: string;
    details?: string;
    videos?: string[];
  };
}

export type ItineraryType = "day" | "period";

export interface ItineraryContentProps {
  itinerary: ItineraryItem[];
  mapImage?: string;
  googleLink?: string;
  type: ItineraryType;
}

export function ItineraryContent({ itinerary, mapImage, googleLink, type }: ItineraryContentProps) {
  return (
    <ItineraryScrollProvider itinerary={itinerary}>
      <ItineraryDayByDaySection mapImage={mapImage} googleLink={googleLink} type={type} />
      <ItineraryItemSections type={type} />
    </ItineraryScrollProvider>
  );
}
