'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import {
  PublicAccommodationExtended,
  PublicAccommodationPageSummary,
} from '@/core/types/accommodations'
import { ImageGrid } from '@/components/common/ImageGrid'
import { AccommodationRoomsSection } from './AccommodationRoomsSection'
import { AccommodationHighlightsSection } from '@/components/accommodation/AccommodationHighlightsSection'
import { AccommodationAmenitiesGrid } from '@/components/accommodation/AccommodationAmenitiesGrid'
import { AccommodationMustKnowsSection } from '@/components/accommodation/AccommodationMustKnowsSection'
import { AccommodationsApiService } from '@/clients/accommodations'

interface AccommodationDetailProps {
  accommodation: PublicAccommodationPageSummary & Partial<PublicAccommodationExtended>
}

const PROSE_CONTAINED =
  'prose prose-lg max-w-none text-gray-700 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full'

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

function CuratorshipQuote({ phrase }: { phrase: string }) {
  return (
    <blockquote className="border-l-4 border-accent-500 bg-white px-5 py-4 rounded-r-xl shadow-sm">
      <p className="font-comfortaa text-base md:text-lg text-primary-800 leading-relaxed italic">
        &ldquo;{phrase}&rdquo;
      </p>
    </blockquote>
  )
}

function BookingSidebar({ curatorshipPhrase }: { curatorshipPhrase?: string | null }) {
  return (
    <div className="space-y-5">
      {curatorshipPhrase ? <CuratorshipQuote phrase={curatorshipPhrase} /> : null}
      <AvailabilityCtaCard />
    </div>
  )
}

function SectionSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-3" aria-hidden="true">
      <div className="h-8 bg-gray-200 rounded w-48" />
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-100 rounded w-full" />
      ))}
    </div>
  )
}

function AmenitiesSkeleton() {
  return (
    <div className="mt-12 pt-12 border-t border-gray-200 animate-pulse" aria-hidden="true">
      <div className="h-8 bg-gray-200 rounded w-56 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

function RoomsSectionSkeleton() {
  return (
    <section id="accommodation-rooms" className="bg-white py-8 scroll-mt-6 md:scroll-mt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto animate-pulse space-y-4" aria-hidden="true">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-40 bg-gray-100 rounded-xl" />
          <div className="h-40 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </section>
  )
}

function hasInlineExtendedContent(accommodation: AccommodationDetailProps['accommodation']): boolean {
  return (
    (accommodation.amenities?.length ?? 0) > 0 ||
    (accommodation.mustKnows?.length ?? 0) > 0 ||
    (accommodation.rooms?.length ?? 0) > 0
  )
}

export function AccommodationDetail({ accommodation }: AccommodationDetailProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [extended, setExtended] = useState<PublicAccommodationExtended | null>(() =>
    hasInlineExtendedContent(accommodation)
      ? {
          amenities: accommodation.amenities ?? [],
          mustKnows: accommodation.mustKnows,
          rooms: accommodation.rooms,
        }
      : null
  )
  const [isLoadingExtended, setIsLoadingExtended] = useState(
    () => !hasInlineExtendedContent(accommodation)
  )
  const [extendedError, setExtendedError] = useState(false)

  const addressLine = accommodation.location.address?.trim()
  const curatorshipPhrase = accommodation.curatorshipPhrase?.trim() || null

  useEffect(() => {
    if (hasInlineExtendedContent(accommodation)) {
      return
    }

    let cancelled = false

    const loadExtended = async () => {
      setIsLoadingExtended(true)
      setExtendedError(false)
      try {
        const data = await AccommodationsApiService.getAccommodationExtended(accommodation.uniqueName)
        if (!cancelled) {
          setExtended(data)
        }
      } catch {
        if (!cancelled) {
          setExtendedError(true)
        }
      } finally {
        if (!cancelled) {
          setIsLoadingExtended(false)
        }
      }
    }

    void loadExtended()

    return () => {
      cancelled = true
    }
  }, [accommodation.uniqueName, accommodation.amenities, accommodation.mustKnows, accommodation.rooms])

  const mustKnows = extended?.mustKnows ?? []
  const amenities = extended?.amenities ?? []
  const rooms = extended?.rooms
  const hasAmenities = amenities.length > 0

  const showMustKnowsSkeleton = isLoadingExtended && mustKnows.length === 0
  const showAmenitiesSkeleton = isLoadingExtended && !hasAmenities
  const showRoomsSkeleton = isLoadingExtended && !rooms

  const roomsSection = useMemo(() => {
    if (showRoomsSkeleton) {
      return <RoomsSectionSkeleton />
    }

    return (
      <Suspense
        fallback={
          <section id="accommodation-rooms" className="bg-white py-8 scroll-mt-6 md:scroll-mt-8">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-48" />
                <div className="h-40 bg-gray-100 rounded-xl" />
              </div>
            </div>
          </section>
        }
      >
        <AccommodationRoomsSection rooms={rooms} uniqueName={accommodation.uniqueName} />
      </Suspense>
    )
  }, [accommodation.uniqueName, rooms, showRoomsSkeleton])

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {accommodation.images && accommodation.images.length > 0 && (
        <ImageGrid
          images={accommodation.images.map((image) => ({
            url: image.url,
            shortDescription: image.shortDescription
          }))}
          title={accommodation.title}
        />
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            {accommodation.title}
          </h1>
          {accommodation.subtitle && (
            <p className={`text-xl md:text-2xl text-gray-600 ${addressLine ? 'mb-2' : 'mb-4'}`}>
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

      {accommodation.highlights && accommodation.highlights.length > 0 && (
        <AccommodationHighlightsSection title={accommodation.title} highlights={accommodation.highlights} />
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 lg:hidden">
            <BookingSidebar curatorshipPhrase={curatorshipPhrase} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  Como é ficar aqui?
                </h2>
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

              {showMustKnowsSkeleton ? (
                <SectionSkeleton lines={4} />
              ) : mustKnows.length > 0 ? (
                <AccommodationMustKnowsSection mustKnows={mustKnows} />
              ) : extendedError ? (
                <p className="text-sm text-gray-500">Não foi possível carregar informações adicionais.</p>
              ) : null}
            </div>

            <div className="hidden lg:block lg:justify-self-end w-full max-w-sm">
              <div className="lg:sticky lg:top-24">
                <BookingSidebar curatorshipPhrase={curatorshipPhrase} />
              </div>
            </div>
          </div>

          {showAmenitiesSkeleton ? (
            <AmenitiesSkeleton />
          ) : hasAmenities ? (
            <div className="mt-12 pt-12 border-t border-gray-200">
              <AccommodationAmenitiesGrid amenities={amenities} />
            </div>
          ) : null}
        </div>
      </div>

      {roomsSection}

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
