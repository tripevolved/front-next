"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { CruisesApiService } from "@/clients/cruises";
import type { CruiseShipAttraction } from "@/clients/cruises/cruiseships";

interface CruiseRestaurantsCarouselProps {
  shipName: string;
}

export default function CruiseRestaurantsCarousel({ shipName }: CruiseRestaurantsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [restaurants, setRestaurants] = useState<CruiseShipAttraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shipName) return;
    setLoading(true);
    setError(null);
    CruisesApiService.getCruiseShipAttractions(shipName, ['Restaurant'])
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        setError("Não foi possível carregar os restaurantes.");
        setLoading(false);
      });
  }, [shipName]);

  const scroll = (direction: string) => {
    if (scrollRef && scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
        <p>Carregando restaurantes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-500 bg-red-50 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!restaurants || !Array.isArray(restaurants) || restaurants.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
        <p>Nenhum restaurante disponível no momento.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="relative min-h-[400px]">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 z-20 bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg"
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

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 z-20 bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg"
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

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {restaurants.map((restaurant, index) => {
            const imageUrl = restaurant.images && restaurant.images.length > 0 && restaurant.images[0].url
              ? restaurant.images[0].url
              : '/assets/blank-image.png';
            const imageAlt = restaurant.images && restaurant.images.length > 0 && restaurant.images[0].shortDescription
              ? restaurant.images[0].shortDescription
              : restaurant.name;

            return (
              <div
                key={`${restaurant.name}-${index}`}
                className="flex-shrink-0 w-64 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg rounded-lg bg-white border border-gray-200 overflow-hidden group/item"
              >
                <div className="flex flex-col">
                  <div className="relative overflow-hidden h-48">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                    />
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <h1 className="font-bold font-baloo text-gray-800 text-xl">
                      {restaurant.name}
                    </h1>
                    {restaurant.description && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {restaurant.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
