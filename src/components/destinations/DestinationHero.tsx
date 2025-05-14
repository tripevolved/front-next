"use client";

import { PublicDestination, TravelType } from "@/core/types/destination";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { ShareModal } from "../ShareModal";
import React, { useState } from "react";

interface DestinationHeroProps {
  destination: PublicDestination;
}

// Helper function to get icon and Portuguese name based on travel type
function getTravelTypeDetails(type: TravelType) {
  const travelTypes = {
    COUPLES: { icon: "💑", name: "Recomendado para casais" },
    FAMILIES: { icon: "👨‍👩‍👧‍👦", name: "Recomendado para famílias" },
    INDIVIDUALS: { icon: "👤", name: "Recomendado para viajantes solo" },
    PAIRS: { icon: "👥", name: "Recomendado para duplas" },
  };

  return travelTypes[type] || { icon: "✈️", name: "Outro" };
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  const { icon, name } = getTravelTypeDetails(destination.travelType);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="relative h-[50vh] md:h-[70vh]">
      {destination.photos && destination.photos.length > 0 && (
        <PhotoCarousel photos={destination.photos} title={destination.title} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="flex flex-row items-center justify-evenly">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-baloo font-bold text-white mb-2">
              {destination.title}
            </h1>

            {/* Destination type with icon */}
            {destination.travelType && (
              <div className="flex items-center mb-4">
                <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-lg font-medium flex items-center">
                  <span className="text-2xl mr-2">{icon}</span>
                  {name}
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {destination.travelerProfiles.map((profile, index) => (
                <span
                  key={index}
                  className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {profile}
                </span>
              ))}
            </div>
          </div>
          <div className="right-0 float-right mx-auto">
            <button
              onClick={handleShare}
              className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-secondary-600 hover:bg-primary-600 transition-colors"
              aria-label="Compartilhar"
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="#ffffff"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        link={typeof window !== "undefined" ? window.location.href : ""}
        message={`Confira este destino incrível: ${destination.title}`}
      />
    </div>
  );
}
