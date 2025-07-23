"use client";

import { useState, useEffect } from "react";
import { ImageCarousel } from "@/components/common/ImageCarousel";
import type { UniqueMoment } from "@/core/types/uniqueMoments";

interface UniqueMomentsCarouselProps {
  uniqueMoments: UniqueMoment[];
}

export function UniqueMomentsCarousel({ uniqueMoments }: UniqueMomentsCarouselProps) {
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0);
  const currentMoment = uniqueMoments[currentMomentIndex];

  const handleMomentChange = (index: number) => {
    setCurrentMomentIndex(index);
  };

  return (
    <div className="relative h-[500px] rounded-2xl overflow-hidden">
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        <ImageCarousel
          images={currentMoment.images}
          title={currentMoment.title}
          height="h-full"
          showCounter={false}
          showIndicators={false}
          showArrows={false}
          autoScroll={true}
          autoScrollInterval={4000}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="text-white">
          <h2 className="text-2xl md:text-3xl font-baloo font-bold mb-2">
            {currentMoment.title}
          </h2>
          <p className="text-lg md:text-xl font-comfortaa mb-2">
            {currentMoment.subtitle}
          </p>
          <p className="text-base md:text-lg opacity-90 max-w-2xl">
            {currentMoment.description}
          </p>
        </div>
      </div>

      {/* Unique Moments Navigation */}
      <div className="absolute top-8 left-8 right-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {uniqueMoments.map((moment, index) => (
            <button
              key={moment.id}
              onClick={() => handleMomentChange(index)}
              className={`px-4 py-2 rounded-full transition-all duration-300 font-baloo font-semibold text-sm md:text-base ${
                index === currentMomentIndex
                  ? "bg-white text-primary-600 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              }`}
              aria-label={`Ver momento: ${moment.title}`}
            >
              {moment.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 