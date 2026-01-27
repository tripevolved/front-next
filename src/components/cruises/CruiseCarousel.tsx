"use client";

import React, { useRef } from "react";
import { CruiseCard } from "./CruiseCard";
import { CruiseData } from "@/clients/cruises/cruises";

interface CruiseCarouselProps {
  handleClick: (uniqueName: string) => void;
  cruises?: CruiseData[];
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

  // Check if there are no cruises
  const hasCruises = cruises && cruises.length > 0;

  // Generate array of cards based on cruises data
  const cards = hasCruises
    ? cruises.map((cruise) => (
        <div key={cruise.uniqueName} className="flex-shrink-0 w-80 md:w-96">
          <CruiseCard handleClick={handleClick} cruise={cruise} />
        </div>
      ))
    : [];

  // Empty state message
  if (!hasCruises) {
    return (
      <div className="w-full py-12">
        <div className="text-center">
          <p className="font-comfortaa text-lg text-gray-600 max-w-2xl mx-auto">
            No momento, não há cruzeiros disponíveis nesta categoria. Nossos especialistas estão sempre atualizando nossa curadoria com os melhores cruzeiros de luxo.
          </p>
          <p className="font-comfortaa text-base text-gray-500 mt-4 max-w-2xl mx-auto">
            Entre em contato conosco para conhecer outras opções disponíveis.
          </p>
        </div>
      </div>
    );
  }

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
