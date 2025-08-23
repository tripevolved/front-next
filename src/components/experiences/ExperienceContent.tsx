"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ShareModal } from "@/components/ShareModal";
import { LocalStorageService } from "@/clients/local";
import type { Experience } from "@/core/types/experiences";
import { VideoOverlay } from "./VideoOverlay";
import { ItineraryContent } from "@/components/itineraries";
import { UniqueMomentsCarousel } from "@/components/uniqueMoments/UniqueMomentsCarousel";
import { ExperienceExitModal } from "./ExperienceExitModal";

interface ExperienceContentProps {
  experience: Experience;
}

export function ExperienceContent({ experience }: ExperienceContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [hasTraveler, setHasTraveler] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    playbackId: string;
    title: string;
    dayIndex: number;
    videoIndex: number;
  } | null>(null);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);
  const [hasShownBottomModal, setHasShownBottomModal] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitModal) {
        setIsExitModalOpen(true);
        setHasShownExitModal(true);
      }
    };

    const handleBeforeUnload = () => {
      if (!hasShownExitModal) {
        setIsExitModalOpen(true);
        setHasShownExitModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasShownExitModal]);

  // Bottom scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (hasShownBottomModal) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show modal when user reaches 90% of the page
      if (scrollTop + windowHeight >= documentHeight * 0.9) {
        setIsExitModalOpen(true);
        setHasShownBottomModal(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownBottomModal]);

  // Function to handle sharing
  const handleShare = () => {
    setIsShareModalOpen(true);
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
    <div className="min-h-screen" ref={containerRef}>
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

      {/* Unique Moments Carousel */}
      {experience.uniqueMoments && experience.uniqueMoments.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-[80%] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-4">
                Alguns momentos chave dessa experiência
              </h2>
            </div>
            <UniqueMomentsCarousel 
              uniqueMoments={experience.uniqueMoments.map((moment, index) => ({
                id: `moment-${index}`,
                title: moment.title,
                subtitle: moment.title,
                description: moment.description,
                images: [moment.image]
              }))}
            />
          </div>
        </section>
      )}

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

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        link={typeof window !== "undefined" ? window.location.href : ""}
        message={`Confira esta experiência incrível: ${experience.title}`}
      />

      {/* Exit Modal */}
      <ExperienceExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        experienceTitle={experience.title}
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
