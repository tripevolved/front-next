'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface ImageGridProps {
  images: string[]
  title: string
}

export function ImageGrid({ images, title }: ImageGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setSelectedImageIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex])

  const goToNext = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex + 1) % images.length)
  }

  const goToPrevious = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)
  }

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
    
    // Reset touch positions
    setTouchStart(null)
    setTouchEnd(null)
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Nenhuma imagem disponível</p>
      </div>
    )
  }

  const mainImage = images[0]
  const sideImages = images.slice(1, 3)
  const remainingCount = images.length > 3 ? images.length - 3 : 0

  return (
    <>
      {/* Desktop/Tablet Layout */}
      <div className="w-full">
        {/* Container for larger screens */}
        <div className="hidden md:block container mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 h-[500px]">
            {/* Main image - 2/3 width */}
            <div className="col-span-2 relative overflow-hidden rounded-l-lg cursor-pointer group">
              <Image
                src={mainImage}
                alt={`${title} - Imagem principal`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
                onClick={() => setSelectedImageIndex(0)}
              />
            </div>

            {/* Side images - 1/3 width */}
            <div className="col-span-1 flex flex-col gap-2">
              {sideImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden cursor-pointer group ${
                    index === 0 ? 'rounded-tr-lg' : ''
                  } ${index === sideImages.length - 1 && remainingCount === 0 ? 'rounded-br-lg' : ''} flex-1`}
                >
                  <Image
                    src={image}
                    alt={`${title} - Imagem ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setSelectedImageIndex(index + 1)}
                  />
                  {/* Show remaining count on last visible image */}
                  {index === sideImages.length - 1 && remainingCount > 0 && (
                    <div 
                      className="absolute inset-0 bg-black/60 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex(index + 1)
                      }}
                    >
                      <span className="text-white text-2xl font-bold">
                        +{remainingCount} fotos
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Main image - full width */}
          <div className="relative h-[300px] w-full">
            <Image
              src={mainImage}
              alt={`${title} - Imagem principal`}
              fill
              className="object-cover"
              priority
              onClick={() => setSelectedImageIndex(0)}
            />
          </div>

          {/* Rest of images in a scrollable row */}
          {sideImages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto p-4 bg-gray-100">
              {sideImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImageIndex(index + 1)}
                >
                  <Image
                    src={image}
                    alt={`${title} - Imagem ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                  {index === sideImages.length - 1 && remainingCount > 0 && (
                    <div 
                      className="absolute inset-0 bg-black/60 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex(index + 1)
                      }}
                    >
                      <span className="text-white text-sm font-bold">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal with Carousel */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setSelectedImageIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={() => setSelectedImageIndex(null)}
            aria-label="Fechar"
          >
            ×
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg text-sm z-10">
            {selectedImageIndex + 1} / {images.length}
          </div>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              aria-label="Imagem anterior"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Próxima imagem"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Current image */}
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImageIndex]}
              alt={`${title} - Imagem ${selectedImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Thumbnail strip at bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/50 rounded-lg">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex
                      ? 'border-white scale-110'
                      : 'border-transparent hover:border-white/50'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex(index)
                  }}
                >
                  <Image
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

