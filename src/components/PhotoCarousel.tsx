'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Photo } from '@/core/types'
import { parsePhotoWithType } from '@/utils/helpers/photo.helpers'

interface PhotoCarouselProps {
  photos: Photo[]
  title: string
}

export function PhotoCarousel({ photos, title }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (photos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % photos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [photos.length])

  if (photos.length === 0) return null

  // TODO improve this component to get the best photo size based on the screen size
  return (
    <div className="relative w-full h-full">
      {photos.map((photo, index) => {
        const parsedPhoto = parsePhotoWithType(photo)
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={parsedPhoto.xxl?.src || parsedPhoto.xl?.src || parsedPhoto.lg?.src || parsedPhoto.md?.src || parsedPhoto.sm?.src}
              alt={`${title} - Foto ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        )
      })}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
} 