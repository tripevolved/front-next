"use client";

import Image from "next/image";
import { VideoSlider } from "@/components/VideoSlider";
import { CruiseDetailsModal } from "@/components/itineraries/CruiseDetailsModal";
import { PublicAccommodationDetailsModal } from "@/components/itineraries/PublicAccommodationDetailsModal";
import type { PublicTripAccommodation } from "@/core/types/public-itinerary";
import {
  AccommodationCard,
  CruiseCard,
  CruiseExperienceCard,
} from "@/components/itineraries/ItineraryActionCards";
import { useItineraryScroll } from "@/components/itineraries/ItineraryScrollContext";
import type { ItineraryItem, ItineraryType } from "@/components/itineraries/ItineraryContent";
import type { Cruise } from "@/core/types/cruise";
import { useState } from "react";

type Props = {
  type: ItineraryType;
  /** Builds anchor links to JourneyDetailsSection accommodation cards */
  accommodationDetailsHref?: (accommodation: NonNullable<ItineraryItem["accommodation"]>) => string;
  /** View-only: no modals, no journey-detail links */
  readOnly?: boolean;
};

export function buildJourneyAccommodationHref(
  accommodation: NonNullable<ItineraryItem["accommodation"]>
): string {
  if (accommodation.accommodationId) {
    return `#journey-accommodation-${accommodation.accommodationId}`;
  }
  return "#journey-details";
}

export function ItineraryItemSections({ type, accommodationDetailsHref, readOnly = false }: Props) {
  const { itinerary, setItemRef, setItemOneRef } = useItineraryScroll();
  const [selectedCruise, setSelectedCruise] = useState<Cruise | null>(null);
  const [isCruiseModalOpen, setIsCruiseModalOpen] = useState(false);
  const [selectedPublicAccommodation, setSelectedPublicAccommodation] =
    useState<PublicTripAccommodation | null>(null);

  const resolveAccommodationHref = accommodationDetailsHref ?? buildJourneyAccommodationHref;
  const showAccommodationDetailsLink = !readOnly && Boolean(accommodationDetailsHref);

  const openCruiseModal = (cruise: Cruise) => {
    setSelectedCruise(cruise);
    setIsCruiseModalOpen(true);
  };

  const closeCruiseModal = () => {
    setIsCruiseModalOpen(false);
    setSelectedCruise(null);
  };

  return (
    <>
      {itinerary.map((item, itemIndex) => (
        <section
          key={item.id}
          id={`item-${item.id}`}
          ref={(el) => {
            setItemRef(itemIndex, el);
            if (item.id === 1) setItemOneRef(el);
          }}
          className="py-16 bg-gray-50 scroll-mt-20"
        >
          <div className="lg:max-w-[80%] mx-auto">
            <div className="relative h-[500px] mb-16 rounded-2xl overflow-hidden">
              <Image
                src={item.image}
                alt={`${type === "day" ? "Dia" : "Parte"} ${item.id} - ${item.activity}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-primary-600 font-comfortaa">
                      {type === "day" ? "dia" : "fase"}
                    </span>
                    <span className="text-xl font-baloo font-bold text-primary-600">
                      {String(item.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-baloo font-bold">{item.activity}</h2>
                    <p className="text-lg">{item.date}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-8 relative z-1 -mt-24 mx-auto max-w-3xl">
              <p className="text-secondary-700">{item.description}</p>
            </div>

            {item.highlights.videos && item.highlights.videos.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-accent-100 rounded-xl p-8 shadow-sm min-w-0 overflow-hidden">
                  <div
                    className="text-secondary-700 prose prose-sm max-w-none min-w-0 break-words prose-p:text-secondary-700 prose-ul:text-secondary-700 prose-ol:text-secondary-700 prose-li:text-secondary-700 prose-p:break-words prose-li:break-words"
                    dangerouslySetInnerHTML={{ __html: item.highlights.description }}
                  />
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm min-w-0">
                  <h3 className="text-lg font-semibold text-primary mb-4">Vídeos</h3>
                  <VideoSlider videos={item.highlights.videos} />
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="bg-accent-100 rounded-xl p-8 shadow-sm min-w-0 overflow-hidden">
                  <div
                    className="text-secondary-700 prose prose-sm max-w-none min-w-0 break-words prose-p:text-secondary-700 prose-ul:text-secondary-700 prose-ol:text-secondary-700 prose-li:text-secondary-700 prose-p:break-words prose-li:break-words"
                    dangerouslySetInnerHTML={{ __html: item.highlights.description }}
                  />
                </div>
              </div>
            )}

            <div className="mt-8">
              {item.accommodation ? (
                <AccommodationCard
                  accommodation={item.accommodation}
                  detailsHref={
                    showAccommodationDetailsLink
                      ? resolveAccommodationHref(item.accommodation)
                      : undefined
                  }
                  onOpenDetails={
                    readOnly && item.accommodation.publicDetails
                      ? () => setSelectedPublicAccommodation(item.accommodation!.publicDetails!)
                      : undefined
                  }
                />
              ) : null}
              {item.experience ? <CruiseExperienceCard experience={item.experience} /> : null}
              {item.cruise ? (
                <CruiseCard
                  cruise={item.cruise}
                  onOpenModal={readOnly ? undefined : openCruiseModal}
                  readOnly={readOnly}
                />
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {readOnly && selectedPublicAccommodation ? (
        <PublicAccommodationDetailsModal
          isOpen={Boolean(selectedPublicAccommodation)}
          onClose={() => setSelectedPublicAccommodation(null)}
          accommodation={selectedPublicAccommodation}
        />
      ) : null}

      {!readOnly && selectedCruise ? (
        <CruiseDetailsModal isOpen={isCruiseModalOpen} onClose={closeCruiseModal} cruise={selectedCruise} />
      ) : null}
    </>
  );
}
