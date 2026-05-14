"use client";

import { useState } from "react";
import Link from "next/link";
import { SelectTripDestinationDrawer } from "@/components/trips/SelectTripDestinationDrawer";

export type TripJourneyHeroProps = {
  tripId: string;
  title: string;
  datesLabel: string;
  coverImageUrl?: string | null;
  /** When empty, user can open destination picker */
  destination?: string | null;
  relatedDestinationUniqueName?: string | null;
};

export function TripJourneyHero({
  tripId,
  title,
  datesLabel,
  coverImageUrl,
  destination,
  relatedDestinationUniqueName,
}: TripJourneyHeroProps) {
  const [destinationDrawerOpen, setDestinationDrawerOpen] = useState(false);
  const needsDestination = !String(destination ?? "").trim();

  return (
    <>
      <section
        className="relative text-white py-16 min-h-[320px] flex flex-col"
        style={
          coverImageUrl
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), url(${coverImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      >
        {!coverImageUrl && <div className="absolute inset-0 bg-secondary-500 -z-10" />}

        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 bg-transparent border border-white text-white hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            aria-label="Voltar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao painel
          </Link>
        </div>

        <div className="max-w-[80%] mx-auto text-center flex-1 flex flex-col items-center justify-center mt-10">
          <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl font-comfortaa mb-8">{datesLabel}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-none">
            <Link
              href="#details"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-50 transition-colors w-full sm:w-auto"
            >
              Ver detalhes
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            {needsDestination ? (
              <button
                type="button"
                onClick={() => setDestinationDrawerOpen(true)}
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-full font-baloo font-semibold hover:bg-white/15 transition-colors w-full sm:w-auto"
              >
                Escolher destino
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <SelectTripDestinationDrawer
        isOpen={destinationDrawerOpen}
        onClose={() => setDestinationDrawerOpen(false)}
        tripId={tripId}
        relatedDestinationUniqueName={relatedDestinationUniqueName ?? undefined}
      />
    </>
  );
}
