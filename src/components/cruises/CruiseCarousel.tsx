"use client";

import React, { useRef } from "react";
import { CruiseCard } from "./CruiseCard";
import { CruiseCardData } from "@/clients/cruises/cruises";

interface CruiseCarouselProps {
  handleClick: () => void;
  cruises?: CruiseCardData[];
  cardsCount?: number;
}

export default function CruiseCarousel({ handleClick, cruises, cardsCount = 3 }: CruiseCarouselProps) {
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

  // Generate array of cards based on cruises data or cardsCount
  const cards = cruises && cruises.length > 0 
    ? cruises.map((cruise, index) => (
        <div key={cruise.id} className="flex-shrink-0 w-80 md:w-96">
          <CruiseCard handleClick={handleClick} cruise={cruise} />
        </div>
      ))
      // TODO: REMOVE THIS WHEN WE HAVE THE DATA
    : Array.from({ length: cardsCount }, (_, index) => (
        <div key={index} className="flex-shrink-0 w-80 md:w-96">
          <CruiseCard handleClick={handleClick} />
        </div>
      ));

  return (
    <div className="w-full">
      <div className="relative">
        {/* Left Navigation Button */}
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

        {/* Right Navigation Button */}
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

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12 py-2"
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
