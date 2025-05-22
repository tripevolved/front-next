'use client'

import { useState, useEffect, useRef } from 'react'
import { MuxVideoPlayer } from '../MuxVideoPlayer'

interface VideoOverlayProps {
  playbackId: string
  title?: string
  onClose: () => void
  videos: { playbackId: string; title: string }[]
  currentIndex: number
  onVideoChange: (index: number) => void
}

export function VideoOverlay({ 
  playbackId, 
  title, 
  onClose, 
  videos,
  currentIndex,
  onVideoChange 
}: VideoOverlayProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add class to hide WhatsApp bubble
    document.body.classList.add('video-overlay-active')
    return () => {
      // Remove class when component unmounts
      document.body.classList.remove('video-overlay-active')
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        if (currentIndex > 0) {
          onVideoChange(currentIndex - 1)
        }
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        if (currentIndex < videos.length - 1) {
          onVideoChange(currentIndex + 1)
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, videos.length, onVideoChange, onClose])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd
    const minDistance = 50 // Minimum distance for swipe

    if (Math.abs(distance) > minDistance) {
      if (distance > 0 && currentIndex < videos.length - 1) {
        // Swipe up - next video
        onVideoChange(currentIndex + 1)
      } else if (distance < 0 && currentIndex > 0) {
        // Swipe down - previous video
        onVideoChange(currentIndex - 1)
      }
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 50) {
      if (e.deltaY > 0 && currentIndex < videos.length - 1) {
        // Scroll down - next video
        onVideoChange(currentIndex + 1)
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up - previous video
        onVideoChange(currentIndex - 1)
      }
    }
  }

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
        aria-label="Close video"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Video Player Container */}
      <div className="w-full h-full flex items-center justify-center">
        <MuxVideoPlayer playbackId={playbackId} title={title} />
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {/* Up Arrow */}
        <div 
          className={`w-full flex justify-center pt-4 transition-opacity duration-300 ${
            currentIndex > 0 ? 'opacity-50 hover:opacity-100' : 'opacity-0'
          }`}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>

        {/* Down Arrow */}
        <div 
          className={`w-full flex justify-center pb-4 transition-opacity duration-300 ${
            currentIndex < videos.length - 1 ? 'opacity-50 hover:opacity-100' : 'opacity-0'
          }`}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
} 