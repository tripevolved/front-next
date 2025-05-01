'use client'

import { useState, useRef, useEffect } from 'react'
import MuxPlayer from '@mux/mux-player-react'

interface MuxVideoPlayerProps {
  playbackId: string
  title?: string
}

export function MuxVideoPlayer({ playbackId, title }: MuxVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<any>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Hide controls after 3 seconds of inactivity
    const handleMouseMove = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-[9/16] bg-black rounded-lg overflow-hidden">
      <MuxPlayer
        ref={videoRef}
        streamType="on-demand"
        playbackId={playbackId}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Overlay Controls */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
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
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
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
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>

        {/* Title */}
        {title && (
          <div className="absolute top-4 left-4 right-4">
            <p className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 