"use client";

import Image from "next/image";
import type { PublicAccommodationHighlight } from "@/core/types/accommodations";

const getIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null;
  return `/assets/emojis/${iconName}.png`;
};

export function AccommodationHighlightsSection({
  title,
  highlights,
  fullWidth = false,
  bleedToParentPadding = false,
}: {
  title: string;
  highlights: PublicAccommodationHighlight[];
  /** When true, removes the `container` horizontal padding so the section can span the full parent width (e.g. drawers). */
  fullWidth?: boolean;
  /**
   * When true, applies negative horizontal margins so the gradient background can span edge-to-edge
   * inside padded parents (like the trip drawer body `p-5 md:p-6`).
   */
  bleedToParentPadding?: boolean;
}) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section
      className={[
        "bg-gradient-to-br from-primary-50 to-accent-50 py-16",
        bleedToParentPadding ? "-mx-5 px-5 md:-mx-6 md:px-6" : "",
      ].join(" ")}
    >
      <div className={fullWidth ? "w-full" : "container mx-auto px-4"}>
        <div className={fullWidth ? "w-full" : "max-w-7xl mx-auto"}>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 text-center">
            Por que escolher o {title}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => {
              const iconPath = getIconPath(highlight.icon);

              return (
                <div
                  key={`${highlight.title}:${index}`}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {highlight.imageUrl && (
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={highlight.imageUrl}
                        alt={highlight.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {iconPath && (
                        <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full p-3 shadow-lg">
                          <div className="relative w-full h-full">
                            <Image src={iconPath} alt={highlight.title} fill className="object-contain" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    {!highlight.imageUrl && iconPath && (
                      <div className="w-12 h-12 mb-4 relative">
                        <Image src={iconPath} alt={highlight.title} fill className="object-contain" />
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{highlight.description}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
