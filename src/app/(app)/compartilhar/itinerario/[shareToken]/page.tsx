"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { TripsApiService } from "@/clients/trips";
import { PublicItineraryHero } from "@/components/trips/PublicItineraryHero";
import { PublicItineraryUnavailable } from "@/components/trips/PublicItineraryUnavailable";
import {
  hasPublicItineraryContent,
  TripItineraryViewer,
} from "@/components/trips/TripItineraryViewer";
import { CircleLoader } from "@/components/common/CircleLoader";

export default function PublicItinerarioPage() {
  const params = useParams();
  const shareToken = params?.shareToken as string;

  const { data: itinerary, error, isLoading } = useSWR(
    shareToken ? `public-itinerary-${shareToken}` : null,
    () => TripsApiService.getPublicItinerary(shareToken),
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <CircleLoader className="h-12 w-12" />
        <p className="text-secondary-600 font-comfortaa text-sm text-center">
          Carregando itinerário...
        </p>
      </div>
    );
  }

  if (error || !itinerary || !itinerary.tripDetails || !hasPublicItineraryContent(itinerary)) {
    return <PublicItineraryUnavailable />;
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicItineraryHero itinerary={itinerary} />
      <TripItineraryViewer itinerary={itinerary} />
    </div>
  );
}
