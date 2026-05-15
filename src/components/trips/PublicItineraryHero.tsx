"use client";

import type { PublicTripItinerary } from "@/core/types/public-itinerary";
import {
  formatPublicItineraryTravelersLabel,
  formatTripHeroDates,
} from "@/utils/helpers/trip-hero.helpers";

type Props = {
  itinerary: PublicTripItinerary;
  showScrollCta?: boolean;
};

export function PublicItineraryHero({ itinerary, showScrollCta = true }: Props) {
  const { tripDetails } = itinerary;
  const title = tripDetails.title;
  const coverImageUrl = tripDetails.coverImage?.url ?? itinerary.descriptionImage?.url;
  const datesLabel = formatTripHeroDates(tripDetails);
  const travelerNames = (itinerary.travelers ?? [])
    .map((t) => t.name?.trim())
    .filter((n): n is string => Boolean(n));
  const travelersLabel = formatPublicItineraryTravelersLabel(travelerNames);

  return (
    <section
      className="relative text-white py-16 min-h-[320px] flex flex-col"
      style={
        coverImageUrl
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.45) 100%), url(${coverImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {!coverImageUrl ? <div className="absolute inset-0 bg-secondary-500 -z-10" /> : null}
      <div className="max-w-[80%] mx-auto text-center flex-1 flex flex-col items-center justify-center mt-6 px-4">
        <p className="font-comfortaa text-sm uppercase tracking-wide text-white/80 mb-2">Trip Evolved</p>
        <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-4 drop-shadow-md">{title}</h1>
        {travelersLabel ? (
          <p className="text-lg md:text-xl font-comfortaa drop-shadow-sm mb-3">{travelersLabel}</p>
        ) : null}
        <p className={`text-lg md:text-xl font-comfortaa drop-shadow-sm ${showScrollCta ? "mb-8" : ""}`}>
          {datesLabel}
        </p>
        {showScrollCta ? (
          <a
            href="#itinerary"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-50 transition-colors w-fit"
          >
            Ver itinerário
          </a>
        ) : null}
      </div>
    </section>
  );
}
