'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { EmptyOrErrorState } from '@/components/common/EmptyOrErrorState'
import { AccommodationsApiService } from '@/clients/accommodations'
import type { AccommodationByCollectionItem } from '@/clients/accommodations'
import type { TravelerType } from '@/clients/collections'
import DateRangeSelector from '@/components/common/DateRangeSelector'
import type { AccommodationAvailabilityQuery } from '@/clients/accommodations'
import type { AccommodationByDestinationAvailabilityItem } from '@/clients/accommodations/by-destination-availability'
import type {
  PublicAccommodationLocation,
  PublicAccommodationRoomAvailability,
  PublicAccommodationRoomRate,
} from '@/core/types/accommodations'
import { formatCurrency } from '@/utils/helpers/currency.helper'
import { buildAccommodationStayQuery } from '@/utils/accommodation-stay-url'

/** Batch availability may include extra fields not declared on by-destination types. */
type AccommodationAvailabilityPlaceFields = {
  destination?: string | null
  location?: PublicAccommodationLocation | string | null
}

const PAGE_SIZE = 6
const PLACEHOLDER_IMAGE = '/assets/blank-image.png'

function imageUrl(img?: { url: string } | null): string {
  const u = img?.url?.trim()
  return u ? u : PLACEHOLDER_IMAGE
}

function destinationFromAvailabilityItem(acc: AccommodationByDestinationAvailabilityItem): string | null {
  const ex = acc as AccommodationByDestinationAvailabilityItem & AccommodationAvailabilityPlaceFields
  const loc = ex.location
  const fromLoc =
    typeof loc === 'string'
      ? loc.trim()
      : loc && typeof loc === 'object' && 'address' in loc
        ? String(loc.address ?? '').trim()
        : ''
  const d = ex.destination?.trim()
  return d || fromLoc || null
}

function pickLowestPriceRate(
  rooms: PublicAccommodationRoomAvailability[] | undefined
): PublicAccommodationRoomRate | null {
  if (!rooms?.length) return null
  let best: PublicAccommodationRoomRate | null = null
  for (const room of rooms) {
    for (const rate of room.rates ?? []) {
      if (best == null || rate.price < best.price) best = rate
    }
  }
  return best
}

function AccommodationCard({
  acc,
  availabilityBestRate,
  href,
}: {
  acc: AccommodationByCollectionItem
  availabilityBestRate?: PublicAccommodationRoomRate | null
  href: string
}) {
  const destinationLabel = acc.destination?.trim() || null
  const recommendedFor = (acc.recommendedFor ?? []).filter(Boolean).slice(0, 2)
  const showOriginal =
    availabilityBestRate != null &&
    typeof availabilityBestRate.originalPrice === 'number' &&
    availabilityBestRate.originalPrice > availabilityBestRate.price
  const taxesTotal =
    availabilityBestRate?.taxes?.reduce((sum, t) => sum + (typeof t?.amount === 'number' ? t.amount : 0), 0) ?? 0

  return (
    <Link
      href={href}
      className={`group block relative rounded-xl overflow-hidden ${
        availabilityBestRate ? 'min-h-[420px]' : 'min-h-[360px]'
      }`}
    >
      <Image
        src={imageUrl(acc.coverImage ?? null)}
        alt={acc.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col gap-2">
        <h3 className="font-baloo text-2xl font-bold leading-tight">{acc.title}</h3>
        {destinationLabel ? (
          <p className="font-comfortaa text-sm text-white/90 leading-snug">{destinationLabel}</p>
        ) : null}
        {recommendedFor.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {recommendedFor.map((t) => (
              <span
                key={`${acc.uniqueName}:rf:${t}`}
                className="bg-accent-500/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
        {availabilityBestRate ? (
          <div className="pt-1 space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              {showOriginal ? (
                <span className="font-comfortaa text-sm text-white/65 line-through tabular-nums">
                  {formatCurrency(availabilityBestRate.originalPrice!, availabilityBestRate.currency)}
                </span>
              ) : null}
              <div className="flex items-baseline gap-2">
                <span className="font-baloo text-xl font-bold tabular-nums text-accent-300">
                  {formatCurrency(availabilityBestRate.price, availabilityBestRate.currency)}
                </span>
                <span className="font-comfortaa text-[11px] text-white/75">total, a partir de</span>
              </div>
            </div>
            {taxesTotal > 0 ? (
              <p className="font-comfortaa text-[10px] leading-snug text-white/70">
                + {formatCurrency(taxesTotal, availabilityBestRate.currency)} em taxas
              </p>
            ) : null}
            <p className="font-comfortaa text-[11px] leading-snug text-white/85">
              Tarifas sem comissão · exclusivo para membros do Círculo Evolved
            </p>
          </div>
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
      <div className="bg-gray-200 rounded-xl min-h-[420px]" />
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
  const adults = 2
  const children = 0
  const childrenAges: number[] = []
  /** API expects `rooms`; casal = one quarto duplo (2 adults, matches aggregate fields). */
  const rooms = [{ adults, children, childrenAges }]

  const query: AccommodationAvailabilityQuery = {
    travelerInput: {
      type: travelerType,
      adults,
      children,
      childrenAges,
      rooms,
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
    setAvailabilityItems(null)
    setAvailabilityError(false)
  }, [collectionUniqueName])

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

  const datesSelected = Boolean(startDate && endDate)

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
      // Avoid racing the initial by-collection fetch (totalCount / paging must be stable).
      if (isLoading) return

      setAvailabilityLoading(true)
      setAvailabilityError(false)
      try {
        let total = totalCount ?? 0
        if (total <= 0) {
          const probe = await AccommodationsApiService.getAccommodationsByCollection(collectionUniqueName, {
            offset: 0,
            limit: 1,
          })
          if (cancelled) return
          total = probe.totalCount ?? 0
        }

        if (cancelled) return
        if (total <= 0) {
          setAvailabilityItems([])
          return
        }

        const catalog = await AccommodationsApiService.getAccommodationsByCollection(collectionUniqueName, {
          offset: 0,
          limit: total,
        })
        const uniqueNames = (catalog.accommodations ?? []).map((a) => a.uniqueName).filter(Boolean)
        if (cancelled) return
        if (uniqueNames.length === 0) {
          setAvailabilityItems([])
          return
        }

        const res = await AccommodationsApiService.postAccommodationAvailabilityByUniqueNames(
          startDate,
          endDate,
          asAvailabilityQuery(travelerType),
          uniqueNames
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
  }, [collectionUniqueName, travelerType, startDate, endDate, isLoading, totalCount])

  const accommodationHref = useCallback(
    (uniqueName: string) => {
      const base = `/hospedagens/${encodeURIComponent(uniqueName)}`
      if (startDate && endDate) {
        return `${base}?${buildAccommodationStayQuery(startDate, endDate, travelerType)}`
      }
      return base
    },
    [startDate, endDate, travelerType]
  )

  const renderCatalogGrid = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {accommodations.map((acc) => (
          <AccommodationCard key={acc.uniqueName} acc={acc} href={accommodationHref(acc.uniqueName)} />
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
  )

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

        {datesSelected && availabilityLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <AccommodationCardSkeleton key={index} />
            ))}
          </div>
        ) : datesSelected &&
          !availabilityLoading &&
          !availabilityError &&
          availabilityItems &&
          availabilityItems.length > 0 ? (
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
                  destination: destinationFromAvailabilityItem(acc),
                  subtitle: null,
                }}
                availabilityBestRate={pickLowestPriceRate(acc.rooms)}
                href={accommodationHref(acc.uniqueName)}
              />
            ))}
          </div>
        ) : datesSelected && !availabilityLoading && availabilityError && accommodations.length > 0 ? (
          <>
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 font-comfortaa text-sm text-amber-950">
              Não foi possível consultar disponibilidade para as datas escolhidas. Mostrando todas as hospedagens da
              coleção.
            </div>
            {renderCatalogGrid()}
          </>
        ) : datesSelected &&
          !availabilityLoading &&
          !availabilityError &&
          availabilityItems &&
          availabilityItems.length === 0 &&
          accommodations.length > 0 ? (
          <>
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 font-comfortaa text-sm text-amber-950">
              Não encontramos disponibilidade para o período selecionado. Abaixo está a lista completa da coleção —
              tente outras datas para ver opções disponíveis.
            </div>
            {renderCatalogGrid()}
          </>
        ) : datesSelected && !availabilityLoading && availabilityError && accommodations.length === 0 ? (
          <EmptyOrErrorState
            status="error"
            title="Não foi possível consultar disponibilidade"
            description="Defina o período novamente ou tente em alguns instantes."
          />
        ) : datesSelected &&
          !availabilityLoading &&
          !availabilityError &&
          availabilityItems &&
          availabilityItems.length === 0 &&
          accommodations.length === 0 ? (
          <EmptyOrErrorState
            status="empty"
            title="Sem disponibilidade para o período selecionado"
            description="Tente outras datas ou confira outras coleções."
          />
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
          renderCatalogGrid()
        )}
      </div>
    </section>
  )
}

