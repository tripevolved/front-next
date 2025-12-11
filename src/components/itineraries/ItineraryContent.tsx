"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { VideoSlider } from "../VideoSlider";
import { HotelDetailsModal } from "./HotelDetailsModal";
import { CruiseDetailsModal } from "./CruiseDetailsModal";
import type { Cruise } from "@/core/types/cruise";
import { Map } from "../maps";

export interface ItineraryItem {
  id: number;
  date: string;
  activity: string;
  image: string;
  description: string;
  hotel?: {
    name: string;
    description: string;
    image: string;
    details?: {
      description: string;
      highlight: string;
      images: string[];
      includedServices: string[];
    };
  };
  experience?: {
    name: string;
    description: string;
    image: string;
  };
  cruise?: Cruise;
  highlights: {
    description: string;
    details?: string;
    videos?: string[];
  };
}

export type ItineraryType = "day" | "period";

export interface ItineraryContentProps {
  itinerary: ItineraryItem[];
  mapImage?: string;
  googleLink?: string;
  type: ItineraryType;
}

// Hotel Component
function HotelComponent({
  hotel,
  onOpenModal,
}: {
  hotel: ItineraryItem["hotel"];
  onOpenModal: (hotel: ItineraryItem["hotel"]) => void;
}) {
  if (!hotel) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Hospedagem</h3>
      <div
        className={`flex flex-col md:flex-row gap-6 ${hotel.details ? "cursor-pointer" : ""}`}
        onClick={() => hotel.details && onOpenModal(hotel)}
      >
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900 mb-2">{hotel.name}</h4>
          <p className="text-gray-600">{hotel.description}</p>
          {hotel.details && (
            <div className="mt-3 flex items-center gap-2 text-primary-600 text-sm">
              <span>Clique para mais detalhes</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="w-full md:w-48 h-48 relative rounded-full overflow-hidden">
          <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

function CruiseExperienceComponent({
  experience,
  onOpenModal,
}: {
  experience: ItineraryItem["experience"];
  onOpenModal: (hotel: ItineraryItem["experience"]) => void;
}) {
  if (!experience) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Experiência</h3>
      <div className={`flex flex-col md:flex-row gap-6 `}>
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900 mb-2">{experience.name}</h4>
          <p className="text-gray-600">{experience.description}</p>
        </div>
        <div className="w-full md:w-48 h-48 relative rounded-full overflow-hidden">
          <Image src={experience.image} alt={experience.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

// Cruise Component
function CruiseComponent({
  cruise,
  onOpenModal,
}: {
  cruise: ItineraryItem["cruise"];
  onOpenModal: (cruise: Cruise) => void;
}) {
  if (!cruise) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Cruzeiro</h3>
      <div
        className="flex flex-col md:flex-row gap-6 cursor-pointer"
        onClick={() => onOpenModal(cruise)}
      >
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900 mb-2">{cruise.name}</h4>
          <p className="text-gray-600 mb-2">{cruise.description}</p>
          <p className="text-sm text-primary-600 font-medium">Duração: {cruise.duration}</p>
          <div className="mt-3 flex items-center gap-2 text-primary-600 text-sm">
            <span>Clique para ver detalhes completos</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
        <div className="w-full md:w-48 h-48 relative rounded-lg overflow-hidden">
          <Image src={cruise.images[0]} alt={cruise.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export function ItineraryContent({ itinerary, mapImage, googleLink, type }: ItineraryContentProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [showItemNav, setShowItemNav] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<ItineraryItem["hotel"] | null>(null);
  const [selectedCruise, setSelectedCruise] = useState<Cruise | null>(null);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isCruiseModalOpen, setIsCruiseModalOpen] = useState(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const itemOneRef = useRef<HTMLElement | null>(null);

  // Set up intersection observer to detect which item is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.id;
            const itemNumber = parseInt(itemId.split("-")[1]);
            setActiveItem(itemNumber);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all item sections
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [itinerary.length]);

  // Set up intersection observer to detect when item 1 is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowItemNav(true);
          } else if (entry.boundingClientRect.top > 0) {
            // Only hide if we're scrolling back up above item 1
            setShowItemNav(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemOneRef.current) {
      observer.observe(itemOneRef.current);
    }

    return () => {
      if (itemOneRef.current) {
        observer.unobserve(itemOneRef.current);
      }
    };
  }, []);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to handle hotel modal
  const openHotelModal = (hotel: ItineraryItem["hotel"]) => {
    setSelectedHotel(hotel);
    setIsHotelModalOpen(true);
  };

  const closeHotelModal = () => {
    setIsHotelModalOpen(false);
    setSelectedHotel(null);
  };

  // Function to handle cruise modal
  const openCruiseModal = (cruise: Cruise) => {
    setSelectedCruise(cruise);
    setIsCruiseModalOpen(true);
  };

  const closeCruiseModal = () => {
    setIsCruiseModalOpen(false);
    setSelectedCruise(null);
  };

  return (
    <>
      {/* Itinerary Section */}
      <section id="itinerary" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Itinerary */}
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
                      {/* Item Circle */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-100 flex flex-col items-center justify-center">
                        <span className="text-xs text-primary-600 font-comfortaa">
                          {type === "day" ? "dia" : "parte"}
                        </span>
                        <span className="text-xl font-baloo font-bold text-primary-600">
                          {String(item.id).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Item Content */}
                      <div className="pt-2">
                        <h3 className="text-xl font-baloo font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                          {item.activity}
                        </h3>
                        <p className="text-sm text-secondary-600">{item.date}</p>
                      </div>
                    </a>

                    {/* Connecting Dots - Fixed to properly connect between items */}
                    {index < itinerary.length - 1 && (
                      <div className="absolute left-8 top-16 h-[calc(100%+2rem)] w-0.5 bg-primary-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="relative">
              <div className="relative h-[600px] rounded-xl overflow-hidden">
                {mapImage && (
                  <>
                    <Image src={mapImage} alt="Mapa do itinerário" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
                  </>
                )}
                {googleLink && (
                  <Map
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
                    center={{ lat: 60.3913, lng: 5.3221 }}
                    height="100%"
                    zoom={15}
                    className="rounded-lg shadow-lg object-cover"
                    showControls={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Item Navigation Sidebar - Only visible on lg screens and above */}
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
                className={`flex items-center justify-center transition-all duration-300`}
              >
                {/* Item Circle */}
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

              {/* Connecting Dots - Faded for non-active items */}
              {index < itinerary.length - 1 && (
                <div
                  className={`absolute left-6 top-12 h-[calc(100%+0.5rem)] w-0.5 transition-opacity duration-300 ${
                    activeItem === item.id || activeItem === item.id + 1
                      ? "bg-primary-200"
                      : "bg-primary-100 opacity-40"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Item Sections */}
      {itinerary.map((item, itemIndex) => (
        <section
          key={itemIndex}
          id={`item-${item.id}`}
          ref={(el) => {
            itemRefs.current[itemIndex] = el;
            if (item.id === 1) itemOneRef.current = el;
          }}
          className="py-16 bg-gray-50 scroll-mt-20"
        >
          <div className="lg:max-w-[80%] mx-auto">
            {/* Item Background Image - Full Width of Container */}
            <div className="relative h-[500px] mb-16 rounded-2xl overflow-hidden">
              <Image
                src={item.image}
                alt={`${type === "day" ? "Dia" : "Parte"} ${item.id} - ${item.activity}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Item Title and Date */}
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-primary-600 font-comfortaa">
                      {type === "day" ? "dia" : "fase"}
                    </span>
                    <span className="text-xl font-baloo font-bold text-primary-600">
                      {String(item.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-baloo font-bold">{item.activity}</h2>
                    <p className="text-lg">{item.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item Description Box - Smaller and Overlapping */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8 relative z-1 -mt-24 mx-auto max-w-3xl">
              <p className="text-secondary-700">{item.description}</p>
            </div>

            {/* New Layout: Highlights Description (Left) + Videos (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Highlights Description */}
              <div className="bg-accent-100 rounded-xl p-8 shadow-sm">
                <p className="text-secondary-700" dangerouslySetInnerHTML={{ __html: item.highlights.description }} />
              </div>

              {/* Right Column - Videos */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                {item.highlights.videos && item.highlights.videos.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-4">Vídeos</h3>
                    <VideoSlider videos={item.highlights.videos} />
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>Nenhum vídeo disponível</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Section - Hotel or Cruise Component */}
            <div className="mt-8">
              {item.hotel && <HotelComponent hotel={item.hotel} onOpenModal={openHotelModal} />}
              {item.experience && (
                <CruiseExperienceComponent
                  experience={item.experience}
                  onOpenModal={openHotelModal}
                />
              )}
              {item.cruise && (
                <CruiseComponent cruise={item.cruise} onOpenModal={openCruiseModal} />
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <HotelDetailsModal
          isOpen={isHotelModalOpen}
          onClose={closeHotelModal}
          hotel={selectedHotel}
        />
      )}

      {/* Cruise Details Modal */}
      {selectedCruise && (
        <CruiseDetailsModal
          isOpen={isCruiseModalOpen}
          onClose={closeCruiseModal}
          cruise={selectedCruise}
        />
      )}
    </>
  );
}
