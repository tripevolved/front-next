"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShareModal } from "@/components/ShareModal";
import ContactExpertModal from "@/components/ContactExpertModal";
import { LocalStorageService } from "@/clients/local";
import type { Experience } from "@/core/types/experiences";
import { VideoOverlay } from "./VideoOverlay";
import { ItineraryContent } from "@/components/itineraries";

interface ExperienceContentProps {
  experience: Experience;
}

export function ExperienceContent({ experience }: ExperienceContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [hasTraveler, setHasTraveler] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    playbackId: string;
    title: string;
    dayIndex: number;
    videoIndex: number;
  } | null>(null);

  // Check if traveler exists in localStorage
  useEffect(() => {
    const traveler = LocalStorageService.getTraveler();
    setHasTraveler(!!traveler);
  }, []);

  // Auto-rotate images in the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % experience.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [experience.images.length]);

  // Function to handle sharing
  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  // Function to handle planning a trip
  const handlePlanTrip = () => {
    if (hasTraveler) {
      // If traveler exists, direct to WhatsApp
      const message = `Olá! Gostaria de planejar uma viagem similar à experiência ${experience.title}.`;
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    } else {
      // If no traveler, open contact modal
      setIsContactModalOpen(true);
    }
  };

  const handleVideoChange = (dayIndex: number, videoIndex: number) => {
    const day = experience.itinerary[dayIndex];
    if (day && day.highlights.videos && day.highlights.videos[videoIndex]) {
      setSelectedVideo({
        playbackId: day.highlights.videos[videoIndex],
        title: `Destaque ${videoIndex + 1}`,
        dayIndex,
        videoIndex,
      });
    }
  };

  const getCurrentVideos = () => {
    if (!selectedVideo) return [];
    const day = experience.itinerary[selectedVideo.dayIndex];
    return day.highlights.videos?.map((playbackId, index) => ({
      playbackId,
      title: `Destaque ${index + 1}`,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh]">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {experience.images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`${experience.title} - Imagem ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-[80%] mx-auto p-8">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-2">{experience.title}</h1>
              <p className="text-lg md:text-xl font-comfortaa mb-1">{experience.dates}</p>
              <p className="text-lg md:text-xl font-comfortaa mb-6">{experience.travelers}</p>
              <a
                href="#itinerary"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-50 transition-colors"
              >
                Ver itinerário
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Content */}
      <ItineraryContent 
        itinerary={experience.itinerary.map((day, index) => ({
          id: day.day,
          date: day.date,
          activity: day.activity,
          image: day.image,
          description: day.description,
          hotel: day.hotel,
          highlights: day.highlights
        }))} 
        mapImage={experience.mapImage}
        type="day"
      />

      {/* Fixed Bottom Menu */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 px-6 z-[11]">
        <div className="mx-auto flex sm:justify-center sm:items-center gap-6">
          <button
            onClick={handlePlanTrip}
            className="bg-primary-600 text-white px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-700 transition-colors z-[11]"
          >
            {hasTraveler ? "Planejar minha viagem" : "Falar com um especialista"}
          </button>

          <button
            onClick={handleShare}
            className="w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center text-secondary-600 hover:bg-secondary-50 transition-colors"
            aria-label="Compartilhar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="#ffffff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        link={typeof window !== "undefined" ? window.location.href : ""}
        message={`Confira esta experiência incrível: ${experience.title}`}
      />

      {/* Contact Expert Modal */}
      <ContactExpertModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Video Overlay */}
      {selectedVideo && (
        <VideoOverlay
          playbackId={selectedVideo.playbackId}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
          videos={getCurrentVideos() || []}
          currentIndex={selectedVideo.videoIndex}
          onVideoChange={(newIndex) => handleVideoChange(selectedVideo.dayIndex, newIndex)}
        />
      )}
    </div>
  );
}
