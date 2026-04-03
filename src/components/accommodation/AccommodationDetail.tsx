'use client'

import { useState } from 'react'
import { PublicAccommodation } from '@/core/types/accommodations'
import { ImageGrid } from '@/components/common/ImageGrid'
import { AccommodationRoomsSection } from './AccommodationRoomsSection'
import Image from 'next/image'

interface AccommodationDetailProps {
  accommodation: PublicAccommodation
}

// Helper function to get icon image path
const getIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null
  return `/assets/emojis/${iconName}.png`
}

// Helper function to get amenity icon path
const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null
  return `/assets/amenities/${iconName}.svg`
}

const PROSE_CONTAINED =
  'prose prose-lg max-w-none text-gray-700 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full'

function buildStayInstructionsText(
  accommodation: PublicAccommodation
): string | null {
  const parts: string[] = []
  if (accommodation.checkInInfo) {
    const { hour, instructions } = accommodation.checkInInfo
    let s = `Check-in previsto às ${hour}`
    s += instructions ? `. ${instructions}` : '.'
    parts.push(s)
  }
  if (accommodation.checkOutInfo) {
    const { hour, instructions } = accommodation.checkOutInfo
    let s = `Check-out previsto às ${hour}`
    s += instructions ? `. ${instructions}` : '.'
    parts.push(s)
  }
  return parts.length > 0 ? parts.join(' ') : null
}

function scrollToAccommodationRooms() {
  document.getElementById('accommodation-rooms')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function AvailabilityCtaCard() {
  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-2xl shadow-lg text-white">
      <h3 className="text-xl font-bold mb-4">Reservar sua hospedagem</h3>
      <button
        type="button"
        onClick={scrollToAccommodationRooms}
        className="w-full bg-white text-primary-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
      >
        Ver disponibilidade
      </button>
    </section>
  )
}

export function AccommodationDetail({ accommodation }: AccommodationDetailProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const addressLine = accommodation.location.address?.trim()
  const stayInstructionsText = buildStayInstructionsText(accommodation)

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Hero section with image grid */}
      {accommodation.images && accommodation.images.length > 0 && (
        <ImageGrid
          images={accommodation.images.map((image) => ({
            url: image.url,
            shortDescription: image.shortDescription
          }))}
          title={accommodation.title}
        />
      )}

      {/* Title and info section */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            {accommodation.title}
          </h1>
          {accommodation.subtitle && (
            <p
              className={`text-xl md:text-2xl text-gray-600 ${addressLine ? 'mb-2' : 'mb-4'}`}
            >
              {accommodation.subtitle}
            </p>
          )}
          {addressLine && (
            <p className="text-sm md:text-base italic text-gray-600 mb-4">{addressLine}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {accommodation.tags && accommodation.tags.length > 0 && (
              <>
                {accommodation.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
            {accommodation.recommendedFor && accommodation.recommendedFor.length > 0 && (
              <>
                {accommodation.recommendedFor.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Highlights Section - Full Width */}
      {accommodation.highlights && accommodation.highlights.length > 0 && (
        <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 text-center">
                Por que escolher o {accommodation.title}?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accommodation.highlights.map((highlight, index) => {
                  const iconPath = getIconPath(highlight.icon)
                  
                  return (
                    <div
                      key={index}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* Image Background */}
                      {highlight.imageUrl && (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={highlight.imageUrl}
                            alt={highlight.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          {iconPath && (
                            <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full p-3 shadow-lg">
                              <div className="relative w-full h-full">
                                <Image
                                  src={iconPath}
                                  alt={highlight.title}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-6">
                        {!highlight.imageUrl && iconPath && (
                          <div className="w-12 h-12 mb-4 relative">
                            <Image
                              src={iconPath}
                              alt={highlight.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                          {highlight.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                      
                      {/* Decorative element */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 lg:hidden">
            <AvailabilityCtaCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column - Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section className="min-w-0">
                <div
                  className={`${PROSE_CONTAINED} ${isDescriptionExpanded ? '' : 'max-h-[40vh] overflow-hidden'}`}
                  dangerouslySetInnerHTML={{ __html: accommodation.description }}
                />
                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  {isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}
                </button>
              </section>

              {/* Amenities */}
              {accommodation.amenities && accommodation.amenities.length > 0 && (
                <section>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {accommodation.amenities.map((amenity, index) => {
                      const amenityIconPath = getAmenityIconPath(amenity.icon)
                      
                      return (
                        <div key={index} className={`flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 ${amenityIconPath ? 'gap-3' : ''}`}>
                          {amenityIconPath ? (
                            <div className="w-6 h-6 flex-shrink-0 text-primary-600">
                              <Image
                                src={amenityIconPath}
                                alt={amenity.title}
                                width={24}
                                height={24}
                                className="w-full h-full"
                              />
                            </div>
                          ) : null}
                          <span className="text-gray-700 text-sm">{amenity.title}</span>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Instruções (check-in / check-out) */}
              {stayInstructionsText && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Você precisa saber
                  </h2>
                  <div className="flex gap-4 items-center">
                    <Image
                      src="/assets/stays/time.png"
                      alt=""
                      width={28}
                      height={28}
                      className="flex-shrink-0"
                    />
                    <p className="text-gray-700 leading-relaxed min-w-0">
                      {stayInstructionsText}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Right column - CTA (desktop) */}
            <div className="hidden lg:block lg:justify-self-end w-full max-w-sm">
              <div className="lg:sticky lg:top-24">
                <AvailabilityCtaCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <AccommodationRoomsSection rooms={accommodation.rooms} uniqueName={accommodation.uniqueName} />

      {/* Mobile: fixed availability CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.08)] lg:hidden"
        role="region"
        aria-label="Reservar hospedagem"
      >
        <button
          type="button"
          onClick={scrollToAccommodationRooms}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3.5 px-6 rounded-full hover:from-primary-600 hover:to-primary-700 transition-colors shadow-md"
        >
          Ver disponibilidade
        </button>
      </div>
    </div>
  )
}
