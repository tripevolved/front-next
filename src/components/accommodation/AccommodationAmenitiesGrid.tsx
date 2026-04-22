"use client";

import Image from "next/image";
import type { PublicAccommodationAmenity } from "@/core/types/accommodations";

const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null;
  return `/assets/amenities/${iconName}.svg`;
};

export function AccommodationAmenitiesGrid({ amenities }: { amenities: PublicAccommodationAmenity[] }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => {
          const amenityIconPath = getAmenityIconPath(amenity.icon);

          return (
            <div
              key={index}
              className={`flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 ${
                amenityIconPath ? "gap-3" : ""
              }`}
            >
              {amenityIconPath ? (
                <div className="w-6 h-6 flex-shrink-0 text-primary-600">
                  <Image src={amenityIconPath} alt={amenity.title} width={24} height={24} className="w-full h-full" />
                </div>
              ) : null}
              <span className="text-gray-700 text-sm">{amenity.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
