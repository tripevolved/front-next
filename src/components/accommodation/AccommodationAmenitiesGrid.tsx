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
    <section className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-2.5">
        {amenities.map((amenity, index) => {
          const amenityIconPath = getAmenityIconPath(amenity.icon);

          return (
            <div
              key={`${amenity.title}-${index}`}
              className={`flex items-center bg-white px-2.5 py-2 md:px-3 md:py-2.5 rounded-md border border-gray-200 min-w-0 ${
                amenityIconPath ? 'gap-1.5 md:gap-2' : ''
              }`}
            >
              {amenityIconPath ? (
                <div className="w-4 h-4 flex-shrink-0 text-primary-600">
                  <Image
                    src={amenityIconPath}
                    alt=""
                    width={16}
                    height={16}
                    className="w-full h-full"
                  />
                </div>
              ) : null}
              <span className="text-gray-700 text-xs leading-snug break-words">{amenity.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
