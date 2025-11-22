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
import { formatCurrency } from "@/utils/helpers/currency.helper";

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

  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de saber mais sobre a experiência "${experience.title}". Pode me ajudar?`;
    const whatsappUrl = `https://wa.me/5551993582462?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
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
        itinerary={experience.itinerary.map((item, index) => ({
          id: item.period,
          date: item.date,
          activity: item.activity,
          image: item.image,
          description: item.description,
          hotel: item.hotel,
          cruise: item.cruise,
          highlights: item.highlights
        }))} 
        mapImage={experience.mapImage}
        type={experience.type === 'day-by-day' ? 'day' : 'period'}
      />

      {/* Price Breakdown Section */}
      {experience.price && (
        <section className="py-16 bg-secondary-50">
          <div className="max-w-[80%] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-4">
                Investimento
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Pricing Summary */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-secondary-600 mb-2">Por pessoa</p>
                      <p className="text-3xl font-baloo font-bold text-secondary-900">
                        {formatCurrency(experience.price.pricePerPerson, experience.price.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-600 mb-2">Total</p>
                      <p className="text-3xl font-baloo font-bold text-primary-600">
                        {formatCurrency(experience.price.total, experience.price.currency)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Included and Not Included */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Included Items */}
                    {experience.price.included.length > 0 && (
                      <div>
                        <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4 flex items-center gap-2">
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Incluso
                        </h3>
                        <ul className="space-y-3">
                          {experience.price.included.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-secondary-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Not Included Items */}
                    {experience.price.notIncluded.length > 0 && (
                      <div>
                        <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4 flex items-center gap-2">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Não incluso
                        </h3>
                        <ul className="space-y-3">
                          {experience.price.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              <span className="text-secondary-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-[80%] mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold text-white mb-6">
              Quer uma viagem como essa, personalizada para você?
            </h2>
            
            {/* Process Preview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-baloo font-semibold text-white mb-4">
                Como funciona:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Reunião de 45 min</h4>
                    <p className="text-sm text-white/80">Entendemos suas preferências e estilo de viagem</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Planejamento personalizado</h4>
                    <p className="text-sm text-white/80">Criamos um roteiro exclusivo para você</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Execução completa</h4>
                    <p className="text-sm text-white/80">Cuidamos de todos os detalhes da sua viagem</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-baloo font-semibold text-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Começar minha jornada
              </button>
              <button
                onClick={handleShareClick}
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-baloo font-semibold text-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </section>

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
