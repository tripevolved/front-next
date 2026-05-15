"use client";

import Image from "next/image";
import { Map } from "@/components/maps";
import { useItineraryScroll } from "@/components/itineraries/ItineraryScrollContext";
import type { ItineraryType } from "@/components/itineraries/ItineraryContent";

type Props = {
  mapImage?: string;
  googleLink?: string;
  type: ItineraryType;
  showFloatingNav?: boolean;
};

export function ItineraryDayByDaySection({
  mapImage,
  googleLink,
  type,
  showFloatingNav = true,
}: Props) {
  const { itinerary, activeItem, showItemNav, scrollToSection } = useItineraryScroll();
  const showMap = Boolean(mapImage || googleLink);

  return (
    <>
      <section id="itinerary" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-[80%] mx-auto">
          <div className={showMap ? "grid grid-cols-1 lg:grid-cols-2 gap-12" : ""}>
            <div className="relative">
              <h2 className="text-3xl font-baloo font-bold text-secondary-900 mb-8">
                Itinerário dia a dia
              </h2>
              <div className="space-y-8">
                {itinerary.map((item, index) => (
                  <div key={item.id} className="relative">
                    <a
                      href={`#item-${item.id}`}
                      onClick={(e) => scrollToSection(e, `item-${item.id}`)}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-100 flex flex-col items-center justify-center">
                        <span className="text-xs text-primary-600 font-comfortaa">
                          {type === "day" ? "dia" : "parte"}
                        </span>
                        <span className="text-xl font-baloo font-bold text-primary-600">
                          {String(item.id).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="pt-2">
                        <h3 className="text-xl font-baloo font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                          {item.activity}
                        </h3>
                        <p className="text-sm text-secondary-600">{item.date}</p>
                      </div>
                    </a>
                    {index < itinerary.length - 1 ? (
                      <div className="absolute left-8 top-16 h-[calc(100%+2rem)] w-0.5 bg-primary-200" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {showMap ? (
              <div className="relative">
                <div className="relative w-full aspect-video min-h-[200px] rounded-xl overflow-hidden">
                {mapImage ? (
                  <>
                    <Image src={mapImage} alt="Mapa do itinerário" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
                  </>
                ) : null}
                {googleLink ? (
                  <Map
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
                    center={{ lat: 60.3913, lng: 5.3221 }}
                    height="100%"
                    zoom={15}
                    className="rounded-lg shadow-lg object-cover"
                    showControls
                  />
                ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {showFloatingNav ? (
        <div
          className={`fixed left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-r-xl p-4 transition-all duration-300 z-10 hidden lg:block ${
            showItemNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={item.id} className="relative">
                <a
                  href={`#item-${item.id}`}
                  onClick={(e) => scrollToSection(e, `item-${item.id}`)}
                  className="flex items-center justify-center transition-all duration-300"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex flex-col items-center justify-center transition-colors ${
                      activeItem === item.id
                        ? "bg-primary-600 text-white"
                        : "bg-primary-100 text-primary-600"
                    }`}
                  >
                    <span className="text-xs font-comfortaa">{type === "day" ? "dia" : "parte"}</span>
                    <span className="text-sm font-baloo font-bold">
                      {String(item.id).padStart(2, "0")}
                    </span>
                  </div>
                </a>
                {index < itinerary.length - 1 ? (
                  <div
                    className={`absolute left-6 top-12 h-[calc(100%+0.5rem)] w-0.5 transition-opacity duration-300 ${
                      activeItem === item.id || activeItem === item.id + 1
                        ? "bg-primary-200"
                        : "bg-primary-100 opacity-40"
                    }`}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
