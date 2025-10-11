"use client";

import React, { useRef } from "react";
import { CruiseCard } from "./CruiseCard";
import { CruiseCardData } from "@/clients/cruises/cruises";

interface CruiseCarouselProps {
  handleClick: () => void;
  cruises?: CruiseCardData[];
  cardsCount?: number;
}

export default function CruiseCarousel({ handleClick, cruises, cardsCount = 4 }: CruiseCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef && scrollRef.current) {
      const scrollAmount = 400; // Adjust based on card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check if we have cruises data
  const hasCruises = cruises && cruises.length > 0;

  // Generate array of cards based on cruises data
  const cards = hasCruises 
    ? cruises.map((cruise, index) => (
        <div key={cruise.id} className="flex-shrink-0 w-80 md:w-96">
          <CruiseCard handleClick={handleClick} cruise={cruise} />
        </div>
      ))
    : [];

  // If no cruises, show empty state
  if (!hasCruises) {
    return (
      <div className="w-full">
        <div className="text-center py-12">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 mx-auto text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          <h3 className="font-baloo text-xl font-semibold text-gray-600 mb-2">
            Nenhum cruzeiro encontrado
          </h3>
          <p className="font-comfortaa text-gray-500">
            Não encontramos cruzeiros desse tipo no momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        {/* Left Navigation Button - only show if we have multiple cards */}
        {cards.length > 1 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 z-10 bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Right Navigation Button - only show if we have multiple cards */}
        {cards.length > 1 && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-12 z-10 bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-2 ${
            cards.length > 1 ? 'px-12' : 'px-4'
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {cards}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
