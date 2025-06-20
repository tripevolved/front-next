'use client'

import { useState, useRef } from 'react'
import MuxPlayer from '@mux/mux-player-react'

interface MuxVideoPlayerProps {
  playbackId: string
  title?: string
  autoplay?: boolean
  loop?: boolean
  isMuted?: boolean
}

export function MuxVideoPlayer({ playbackId, title, autoplay = true, loop = true, isMuted = true }: MuxVideoPlayerProps) {
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  const handleMouseActivity = () => {
    setShowControls(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div
      className="relative w-full mx-auto bg-black rounded-lg overflow-hidden object-cover"
      onMouseMove={handleMouseActivity}
      onMouseEnter={handleMouseActivity}
    >
      <MuxPlayer
        ref={videoRef}
        streamType="on-demand"
        playbackId={playbackId}
        autoPlay={autoplay}
        loop={loop}
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        accentColor="#0ab9ad"
      />

      {/* Overlay Controls */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
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
  );
}
