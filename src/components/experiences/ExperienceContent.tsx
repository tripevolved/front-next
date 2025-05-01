'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { WhatsAppDirectButton } from '@/components/WhatsAppDirectButton'
import { ShareModal } from '@/components/ShareModal'
import ContactExpertModal from '@/components/ContactExpertModal'
import { LocalStorageService } from '@/clients/local'
import { Experience } from '@/core/types/experiences'
import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'
import { VideoOverlay } from './VideoOverlay'

interface ExperienceContentProps {
  experience: Experience
}

export function ExperienceContent({ experience }: ExperienceContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [hasTraveler, setHasTraveler] = useState(false)
  const [activeDay, setActiveDay] = useState<number | null>(null)
  const [showDayNav, setShowDayNav] = useState(false)
  const dayRefs = useRef<(HTMLElement | null)[]>([])
  const dayOneRef = useRef<HTMLElement | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<{ 
    playbackId: string; 
    title: string;
    dayIndex: number;
    videoIndex: number;
  } | null>(null)

  // Check if traveler exists in localStorage
  useEffect(() => {
    const traveler = LocalStorageService.getTraveler()
    setHasTraveler(!!traveler)
  }, [])

  // Auto-rotate images in the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % experience.images.length
      )
    }, 5000)
    
    return () => clearInterval(interval)
  }, [experience.images.length])

  // Set up intersection observer to detect which day is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dayId = entry.target.id
            const dayNumber = parseInt(dayId.split('-')[1])
            setActiveDay(dayNumber)
          }
        })
      },
      { threshold: 0.5 }
    )

    // Observe all day sections
    dayRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      dayRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [experience.itinerary.length])

  // Set up intersection observer to detect when day 1 is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowDayNav(true)
          } else if (entry.boundingClientRect.top > 0) {
            // Only hide if we're scrolling back up above day 1
            setShowDayNav(false)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (dayOneRef.current) {
      observer.observe(dayOneRef.current)
    }

    return () => {
      if (dayOneRef.current) {
        observer.unobserve(dayOneRef.current)
      }
    }
  }, [])

  // Function to handle sharing
  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  // Function to handle planning a trip
  const handlePlanTrip = () => {
    if (hasTraveler) {
      // If traveler exists, direct to WhatsApp
      const message = `Olá! Gostaria de planejar uma viagem similar à experiência ${experience.title}.`
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
    } else {
      // If no traveler, open contact modal
      setIsContactModalOpen(true)
    }
  }

  // Function to handle smooth scrolling to sections
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleVideoChange = (dayIndex: number, videoIndex: number) => {
    const day = experience.itinerary[dayIndex]
    if (day && day.highlights.videos[videoIndex]) {
      setSelectedVideo({
        playbackId: day.highlights.videos[videoIndex],
        title: `Destaque ${videoIndex + 1}`,
        dayIndex,
        videoIndex
      })
    }
  }

  const getCurrentVideos = () => {
    if (!selectedVideo) return []
    const day = experience.itinerary[selectedVideo.dayIndex]
    return day.highlights.videos.map((playbackId, index) => ({
      playbackId,
      title: `Destaque ${index + 1}`
    }))
  }

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
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
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
              <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-2">
                {experience.title}
              </h1>
              <p className="text-lg md:text-xl font-comfortaa mb-1">
                {experience.dates}
              </p>
              <p className="text-lg md:text-xl font-comfortaa mb-6">
                {experience.travelers}
              </p>
              <a
                href="#itinerary"
                onClick={(e) => scrollToSection(e, 'itinerary')}
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
                {experience.itinerary.map((day, index) => (
                  <div key={day.day} className="relative">
                    <a
                      href={`#day-${day.day}`}
                      onClick={(e) => scrollToSection(e, `day-${day.day}`)}
                      className="flex items-start gap-4 group"
                    >
                      {/* Day Circle */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-100 flex flex-col items-center justify-center">
                        <span className="text-xs text-primary-600 font-comfortaa">
                          dia
                        </span>
                        <span className="text-xl font-baloo font-bold text-primary-600">
                          {String(day.day).padStart(2, '0')}
                        </span>
                      </div>
                      
                      {/* Day Content */}
                      <div className="pt-2">
                        <h3 className="text-xl font-baloo font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                          {day.activity}
                        </h3>
                        <p className="text-sm text-secondary-600">
                          {day.date}
                        </p>
                      </div>
                    </a>
                    
                    {/* Connecting Dots - Fixed to properly connect between days */}
                    {index < experience.itinerary.length - 1 && (
                      <div className="absolute left-8 top-16 h-[calc(100%+2rem)] w-0.5 bg-primary-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Map */}
            <div className="relative">
              <div className="relative h-[600px] rounded-xl overflow-hidden">
                <Image
                  src="/assets/maps/wine-route-map.jpg"
                  alt="Mapa da Rota do Vinho"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day-by-Day Navigation Sidebar - Only visible on lg screens and above */}
      <div 
        className={`fixed left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-r-xl p-4 transition-all duration-300 z-10 hidden lg:block ${
          showDayNav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-4">
          {experience.itinerary.map((day, index) => (
            <div key={day.day} className="relative">
              <a
                href={`#day-${day.day}`}
                onClick={(e) => scrollToSection(e, `day-${day.day}`)}
                className={`flex items-center justify-center transition-all duration-300`}
              >
                {/* Day Circle */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex flex-col items-center justify-center transition-colors ${
                  activeDay === day.day ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'
                }`}>
                  <span className="text-xs font-comfortaa">
                    dia
                  </span>
                  <span className="text-sm font-baloo font-bold">
                    {String(day.day).padStart(2, '0')}
                  </span>
                </div>
              </a>
              
              {/* Connecting Dots - Faded for non-active days */}
              {index < experience.itinerary.length - 1 && (
                <div className={`absolute left-6 top-12 h-[calc(100%+0.5rem)] w-0.5 transition-opacity duration-300 ${
                  activeDay === day.day || activeDay === day.day + 1 ? 'bg-primary-200' : 'bg-primary-100 opacity-40'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Day Sections */}
      {experience.itinerary.map((day, dayIndex) => (
        <section 
          key={dayIndex} 
          id={`day-${day.day}`} 
          ref={(el) => {
            dayRefs.current[dayIndex] = el;
            if (day.day === 1) dayOneRef.current = el;
          }}
          className="py-16 bg-gray-50 scroll-mt-20"
        >
          <div className="lg:max-w-[80%] mx-auto">
            {/* Day Background Image - Full Width of Container */}
            <div className="relative h-[500px] mb-16 rounded-2xl overflow-hidden">
              <Image
                src={day.image}
                alt={`Dia ${day.day} - ${day.activity}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              {/* Day Title and Date */}
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex flex-col items-center justify-center">
                    <span className="text-xs text-primary-600 font-comfortaa">
                      dia
                    </span>
                    <span className="text-xl font-baloo font-bold text-primary-600">
                      {String(day.day).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-baloo font-bold">
                      {day.activity}
                    </h2>
                    <p className="text-lg">
                      {day.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Day Description Box - Smaller and Overlapping */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8 relative z-1 -mt-24 mx-auto max-w-3xl">
              <p className="text-secondary-700">
                {day.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="flex flex-col gap-6 lg:col-span-2">
                <div className="bg-accent-100 rounded-xl p-8 shadow-sm">
                  <p className="text-secondary-700">
                    {day.highlights.description}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-4">Hospedagem</h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{day.hotel.name}</h4>
                      <p className="text-gray-600">{day.hotel.description}</p>
                    </div>
                    <div className="w-full md:w-48 h-48 relative rounded-lg overflow-hidden">
                      <Image
                        src={day.hotel.image}
                        alt={day.hotel.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>  
                </div>
              </div>
              
              {/* Right Column - Highlights */}
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 lg:col-span-3">
                <div className="relative">
                  <div className="overflow-x-auto pb-4 -mx-4 px-4">
                    <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-4">
                      {day.highlights.videos.map((video, videoIndex) => (
                        <div
                          key={videoIndex}
                          className="relative cursor-pointer group"
                          onClick={() => handleVideoChange(dayIndex, videoIndex)}
                        >
                          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
                            <MuxVideoPlayer
                              playbackId={video}
                              title={`Destaque ${videoIndex + 1}`}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-700">Destaque {videoIndex + 1}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Fixed Bottom Menu */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 px-6">
        <div className="mx-auto flex sm:justify-center sm:items-center gap-6">
          <button
            onClick={handlePlanTrip}
            className="bg-primary-600 text-white px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-700 transition-colors"
          >
            {hasTraveler ? 'Planejar minha viagem' : 'Falar com um especialista'}
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
        link={typeof window !== 'undefined' ? window.location.href : ''}
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
          videos={getCurrentVideos()}
          currentIndex={selectedVideo.videoIndex}
          onVideoChange={(newIndex) => handleVideoChange(selectedVideo.dayIndex, newIndex)}
        />
      )}
    </div>
  )
} 