'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { EmptyOrErrorState } from '@/components/common/EmptyOrErrorState'
import { AccommodationsApiService } from '@/clients/accommodations'
import type { AccommodationByCollectionItem } from '@/clients/accommodations'
import type { TravelerType } from '@/clients/collections'
import DateRangeSelector from '@/components/common/DateRangeSelector'
import type { AccommodationAvailabilityQuery } from '@/clients/accommodations'
import type { AccommodationByDestinationAvailabilityItem } from '@/clients/accommodations/by-destination-availability'

const PAGE_SIZE = 6
const PLACEHOLDER_IMAGE = '/assets/blank-image.png'

function imageUrl(img?: { url: string } | null): string {
  const u = img?.url?.trim()
  return u ? u : PLACEHOLDER_IMAGE
}

function AccommodationCard({ acc }: { acc: AccommodationByCollectionItem }) {
  return (
    <Link
      href={`/hospedagens/${acc.uniqueName}`}
      className="group block relative h-[360px] rounded-xl overflow-hidden"
    >
      <Image
        src={imageUrl(acc.coverImage ?? null)}
        alt={acc.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-baloo text-2xl font-bold leading-tight">{acc.title}</h3>
        {acc.destination ? (
          <p className="mt-2 font-comfortaa text-sm text-white/90">{acc.destination}</p>
        ) : null}
      </div>

      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        {(acc.tags ?? []).slice(0, 2).map((t) => (
          <span
            key={`${acc.uniqueName}:${t}`}
            className="bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}

function AccommodationCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl h-[360px]" />
      <div className="mt-4 h-6 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
    </div>
  )
}

function TravelerTypeToggle({ value }: { value: TravelerType }) {
  const label = value === 'FAMILY' ? 'Família' : 'Casal'
  return (
    <div className="inline-flex rounded-full bg-secondary-100 px-4 py-2 opacity-80 cursor-not-allowed select-none">
      <span className="text-sm font-baloo text-secondary-900">{label}</span>
    </div>
  )
}

function asAvailabilityQuery(travelerType: TravelerType): AccommodationAvailabilityQuery {
  // Minimal, safe traveler input; can be expanded later with a real form.
  const query: AccommodationAvailabilityQuery = {
    travelerInput: {
      type: travelerType,
      adults: 2,
      children: 0,
      childrenAges: [],
      rooms: [],
    },
  }
  return query
}

export default function CollectionAccommodationsSection({
  collectionUniqueName,
  travelerType,
}: {
  collectionUniqueName: string
  travelerType: TravelerType
}) {
  const [accommodations, setAccommodations] = useState<AccommodationByCollectionItem[]>([])
  const [offset, setOffset] = useState(0)
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasError, setHasError] = useState(false)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const dateRangeRef = useRef<HTMLDivElement>(null)
  const [availabilityLoading, setAvailabilityLoading] = useState(false)
  const [availabilityError, setAvailabilityError] = useState(false)
  const [availabilityItems, setAvailabilityItems] = useState<AccommodationByDestinationAvailabilityItem[] | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false)
      }
    }
    if (isCalendarOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCalendarOpen])

  const formatDateRange = () => {
    if (!startDate || !endDate) return ''
    const formattedStart = format(startDate, 'dd/MM/yyyy', { locale: ptBR })
    const formattedEnd = format(endDate, 'dd/MM/yyyy', { locale: ptBR })
    return `${formattedStart} - ${formattedEnd}`
  }

  const hasMore = useMemo(() => {
    if (totalCount == null) return false
    return accommodations.length < totalCount
  }, [accommodations.length, totalCount])

  const fetchPage = async (nextOffset: number, mode: 'replace' | 'append') => {
    const response = await AccommodationsApiService.getAccommodationsByCollection(collectionUniqueName, {
      offset: nextOffset,
      limit: PAGE_SIZE,
    })

    setTotalCount(response.totalCount ?? 0)
    const next = response.accommodations ?? []
    const nextCount = response.count ?? next.length
    const newOffset = (response.offset ?? nextOffset) + nextCount

    setOffset(newOffset)
    setAccommodations((prev) => (mode === 'replace' ? next : [...prev, ...next]))
  }

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setIsLoading(true)
      setHasError(false)
      try {
        await fetchPage(0, 'replace')
      } catch (error) {
        console.error('Error fetching collection accommodations:', error)
        if (!cancelled) setHasError(true)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionUniqueName])

  useEffect(() => {
    let cancelled = false
    const fetchAvailability = async () => {
      if (!startDate || !endDate) return
      setAvailabilityLoading(true)
      setAvailabilityError(false)
      try {
        const res = await AccommodationsApiService.postAccommodationAvailabilityByCollection(
          collectionUniqueName,
          startDate,
          endDate,
          asAvailabilityQuery(travelerType)
        )
        if (cancelled) return
        setAvailabilityItems(res.accommodations ?? [])
      } catch (error) {
        console.error('Error fetching collection accommodations availability:', error)
        if (!cancelled) {
          setAvailabilityError(true)
          setAvailabilityItems(null)
        }
      } finally {
        if (!cancelled) setAvailabilityLoading(false)
      }
    }

    fetchAvailability()
    return () => {
      cancelled = true
    }
  }, [collectionUniqueName, travelerType, startDate, endDate])

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return
    setIsLoadingMore(true)
    setHasError(false)
    try {
      await fetchPage(offset, 'append')
    } catch (error) {
      console.error('Error fetching more collection accommodations:', error)
      setHasError(true)
    } finally {
      setIsLoadingMore(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-500">Hospedagens</h2>
            <p className="font-comfortaa text-gray-600 mt-2">
              Nossa seleção foi feita com critério e atenção, pensando na sua melhor jornada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-end">
            <TravelerTypeToggle value={travelerType} />
            <div className="relative w-full sm:w-auto sm:min-w-[320px]" ref={dateRangeRef}>
              <input
                type="text"
                value={formatDateRange()}
                onClick={() => setIsCalendarOpen((v) => !v)}
                readOnly
                placeholder="Selecione as datas"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-baloo cursor-pointer bg-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>

              {isCalendarOpen ? (
                <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 left-0">
                  <DateRangeSelector
                    startDate={startDate}
                    endDate={endDate}
                    onDateRangeChange={(update) => {
                      setStartDate(update[0])
                      setEndDate(update[1])
                      if (!update[0] || !update[1]) setAvailabilityItems(null)
                      if (update[0] && update[1]) setIsCalendarOpen(false)
                    }}
                    minDate={new Date()}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Availability only runs after dates are set */}
        {availabilityLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <AccommodationCardSkeleton key={index} />
            ))}
          </div>
        ) : availabilityError ? (
          <EmptyOrErrorState
            status="error"
            title="Não foi possível consultar disponibilidade"
            description="Defina o período novamente ou tente em alguns instantes."
          />
        ) : Array.isArray(availabilityItems) ? (
          availabilityItems.length === 0 ? (
            <EmptyOrErrorState
              status="empty"
              title="Sem disponibilidade para o período selecionado"
              description="Tente outras datas para encontrar opções disponíveis."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
              {availabilityItems.map((acc) => (
                <AccommodationCard
                  key={acc.uniqueName}
                  acc={{
                    id: acc.id,
                    uniqueName: acc.uniqueName,
                    title: acc.title,
                    coverImage: acc.coverImage ?? null,
                    tags: acc.tags ?? [],
                    recommendedFor: acc.recommendedFor ?? [],
                    amenities: acc.amenities ?? [],
                    destination: null,
                    subtitle: null,
                  }}
                />
              ))}
            </div>
          )
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <AccommodationCardSkeleton key={index} />
            ))}
          </div>
        ) : hasError ? (
          <EmptyOrErrorState
            status="error"
            title="Não foi possível carregar as hospedagens"
            description="Tente novamente em alguns instantes."
          />
        ) : accommodations.length === 0 ? (
          <EmptyOrErrorState
            status="empty"
            title="Nenhuma hospedagem encontrada"
            description="Em breve teremos novas recomendações para esta coleção."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {accommodations.map((acc) => (
                <AccommodationCard key={acc.uniqueName} acc={acc} />
              ))}
            </div>

            {hasMore ? (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? 'Carregando...' : 'Carregar mais'}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}

