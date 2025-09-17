"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { mockExperiences } from "@/core/types/experiences";

export default function CruiseImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter experiences to only show visible ones
  const visibleExperiences = mockExperiences.filter((experience) => experience.isVisible);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % visibleExperiences.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [visibleExperiences.length]);

  // Don't render if no visible experiences
  if (visibleExperiences.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {visibleExperiences.map((experience) => (
            <div key={experience.name} className="w-full flex-shrink-0">
              <div className="flex flex-col lg:flex-row items-center gap-8 p-1">
                {/* Image */}
                <div className="w-full h-[300px] lg:h-[400px] relative rounded-lg overflow-hidden">
                  <Image
                    src={experience.images[0]}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {visibleExperiences.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
