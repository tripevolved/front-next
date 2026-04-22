'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { TripsApiService } from '@/clients/trips'
import type { TripListView } from '@/core/types/trip'
import { formatCurrency } from '@/utils/helpers/currency.helper'
import { ImageCarousel } from '@/components/common/ImageCarousel'
import { CircleLoader } from '@/components/common/CircleLoader'
import { EmptyOrErrorState } from '@/components/common/EmptyOrErrorState'
import { WhatsAppDirectButton } from '@/components/WhatsAppDirectButton'

const PLACEHOLDER_IMAGE = '/assets/blank-image.png'

const MONTHS: Record<string, number> = {
  jan: 1, januario: 1, january: 1,
  fev: 2, feb: 2, fevereiro: 2, february: 2,
  mar: 3, março: 3, marco: 3, march: 3,
  abr: 4, apr: 4, abril: 4, april: 4,
  mai: 5, may: 5, maio: 5,
  jun: 6, junho: 6, june: 6,
  jul: 7, julho: 7, july: 7,
  ago: 8, aug: 8, agosto: 8, august: 8,
  set: 9, sep: 9, setembro: 9, september: 9,
  out: 10, oct: 10, outubro: 10, october: 10,
  nov: 11, novembro: 11, november: 11,
  dez: 12, dec: 12, dezembro: 12, december: 12,
}

const MONTH_NAMES: Record<number, string> = {
  1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril', 5: 'Maio', 6: 'Junho',
  7: 'Julho', 8: 'Agosto', 9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro',
}

interface MonthGroup {
  key: string
  label: string
  sortOrder: number
  trips: TripListView[]
}

/** Parse date string (ISO or similar) to timestamp. Returns 0 if invalid, Infinity if future TBD. */
function parseDateToTimestamp(dateStr: string | null | undefined): number {
  if (!dateStr || !dateStr.trim()) return 0
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return 0
  return d.getTime()
}

/** Parse period string to a sortable timestamp (ms). Returns 0 if unparseable. Used as fallback. */
function parsePeriodToDate(period: string | undefined): number {
  if (!period || !period.trim()) return 0
  const lower = period.toLowerCase().trim()

  if (/\b(em breve|a definir|tbd|por definir)\b/.test(lower)) return Infinity
  if (/\b(passada|concluída|realizada|finalizada)\b/.test(lower)) return 0

  const yearMatch = lower.match(/\b(20\d{2})\b/)
  const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear()
  const monthMatch = lower.match(/\b(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|january|february|march|april|may|june|july|august|september|october|november|december)\w*/i)
  const month = monthMatch ? (MONTHS[monthMatch[1].toLowerCase().slice(0, 3)] ?? 1) : 1
  const dayMatch = lower.match(/\b(\d{1,2})\b/)
  const day = dayMatch ? Math.min(31, parseInt(dayMatch[1], 10)) : 1
  return new Date(year, month - 1, day).getTime()
}

function getTripSortDate(trip: TripListView): number {
  const fromStart = parseDateToTimestamp(trip.startDate)
  if (fromStart > 0) return fromStart
  return parsePeriodToDate(trip.period)
}

function sortTripsByDate(trips: TripListView[]): TripListView[] {
  return [...trips].sort((a, b) => {
    const da = getTripSortDate(a)
    const db = getTripSortDate(b)
    if (da === 0 && db === 0) return 0
    if (da === 0) return 1
    if (db === 0) return -1
    return da - db
  })
}

/** Extract year and month for grouping. */
function getTripMonthYear(trip: TripListView): { year: number; month: number } | null {
  const ts = getTripSortDate(trip)
  if (ts === 0 || ts === Infinity) return null
  const d = new Date(ts)
  return { year: d.getFullYear(), month: d.getMonth() + 1 }
}

/** Group trips by month/year for timeline display. */
function groupTripsByMonth(trips: TripListView[]): MonthGroup[] {
  const sorted = sortTripsByDate(trips)
  const groups = new Map<string, { trips: TripListView[]; sortOrder: number }>()
  const PAST_KEY = '__past__'
  const FUTURE_KEY = '__future__'

  sorted.forEach((trip) => {
    const parsed = getTripMonthYear(trip)
    const ts = getTripSortDate(trip)
    let key: string
    let sortOrder: number
    let label: string

    if (ts === 0) {
      key = PAST_KEY
      sortOrder = 0
      label = 'Viagens passadas'
    } else if (ts === Infinity) {
      key = FUTURE_KEY
      sortOrder = Infinity
      label = 'Em breve'
    } else if (parsed) {
      key = `${parsed.year}-${parsed.month.toString().padStart(2, '0')}`
      sortOrder = parsed.year * 12 + parsed.month
      label = `${MONTH_NAMES[parsed.month]} ${parsed.year}`
    } else {
      key = FUTURE_KEY
      sortOrder = Infinity
      label = 'Em breve'
    }

    if (!groups.has(key)) {
      groups.set(key, { trips: [], sortOrder })
    }
    groups.get(key)!.trips.push(trip)
  })

  const labels: Record<string, string> = {
    [PAST_KEY]: 'Viagens passadas',
    [FUTURE_KEY]: 'Em breve',
  }
  return Array.from(groups.entries())
    .sort(([, a], [, b]) => a.sortOrder - b.sortOrder)
    .map(([key, { trips, sortOrder }]) => ({
      key,
      label: labels[key] ?? `${MONTH_NAMES[parseInt(key.slice(5), 10)]} ${key.slice(0, 4)}`,
      sortOrder,
      trips,
    }))
}

const ESTIMATED_STATUSES = ['NEW', 'PRE_PROPOSAL'] as const

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Ideia de viagem',
  PRE_PROPOSAL: 'Veja os destinos que recomendamos',
  SET: 'Veja sua proposta de viagem',
  IN_CHECKOUT: 'Finalize seu checkout',
  TO_HAPPEN: 'Tudo pronto',
  ONGOING: 'Em andamento',
  TAKEN: 'Viagem concluída',
}

function getTripHref(trip: TripListView): string | null {
  if (trip.status === 'NEW') return null

  switch (trip.status) {
    case 'PRE_PROPOSAL':
      return `/app/viagens/${trip.id}/pre-proposta`
    case 'SET':
      return `/app/viagens/${trip.id}/proposta`
    case 'IN_CHECKOUT':
      return `/app/viagens/${trip.id}/checkout`
    default:
      return `/app/viagens/${trip.id}`
  }
}

function TripIdeaModal({ trip, onClose }: { trip: TripListView; onClose: () => void }) {

  const imageUrls = trip.images?.map((img) => img.url).filter(Boolean) ?? []
  const price = trip.estimatedPrice ?? trip.price
  const savings = trip.estimatedSavings ?? trip.savings
  const descriptionText = (trip.description ?? '')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const hasTripDescription = Boolean(descriptionText)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="font-baloo text-lg font-bold text-secondary-900 truncate">{trip.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {imageUrls.length > 0 && (
            <div className="w-full h-48 sm:h-56 shrink-0">
              <ImageCarousel
                images={imageUrls}
                title={trip.title}
                height="h-48 sm:h-56"
                showCounter={false}
                showArrows={true}
                autoScroll={false}
              />
            </div>
          )}
          <div className="p-6 space-y-4">
            {trip.destination && (
              <p className="text-sm text-secondary-600 font-medium">{trip.destination}</p>
            )}
            {hasTripDescription ? (
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 overflow-hidden">
                <p className="text-xs font-semibold text-accent-700 uppercase tracking-wider mb-2">
                  Recomendação do especialista
                </p>
                <div
                  className="text-secondary-700 font-comfortaa text-sm leading-relaxed prose prose-sm max-w-none overflow-hidden break-words [&_*]:max-w-full [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full [&_iframe]:max-h-[200px]"
                  dangerouslySetInnerHTML={{ __html: trip.description ?? '' }}
                />
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Image
                    src="/assets/states/success-state.svg"
                    alt=""
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                  <h3 className="text-base font-bold text-gray-900">Recomendações em breve</h3>
                  <p className="text-sm text-gray-600">
                    Um especialista está montando sua viagem agora. Assim que estiver pronta, você verá a recomendação aqui.
                  </p>
                </div>
              </div>
            )}
            {(price != null && price !== 0) || (savings != null && savings !== 0) ? (
              <div className="flex flex-col gap-1 pt-2">
                {price != null && price !== 0 && (
                  <p className="font-baloo font-bold text-secondary-900">
                    Valor total previsto: {formatCurrency(price)}
                  </p>
                )}
                {savings != null && savings !== 0 && price != null && price !== 0 && (
                  <p className="text-sm text-accent-600">
                    Valor exclusivo para o Círculo Evolved: {formatCurrency(price - savings)}
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 shrink-0">
          <WhatsAppDirectButton
            message={`Olá! Gostaria de falar com um especialista sobre a ideia de viagem: ${trip.title}`}
            className="block w-full text-center font-baloo bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-full text-base font-semibold"
          >
            Explorar esta ideia
          </WhatsAppDirectButton>
        </div>
      </div>
    </div>
  )
}

function formatDateRange(startDate: string | null | undefined, endDate: string | null | undefined): string | null {
  if (!startDate) return null
  try {
    const start = new Date(startDate)
    if (isNaN(start.getTime())) return null
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
    if (endDate) {
      const end = new Date(endDate)
      if (!isNaN(end.getTime()) && end.getTime() !== start.getTime()) {
        return `${start.toLocaleDateString('pt-BR', options)} – ${end.toLocaleDateString('pt-BR', options)}`
      }
    }
    return start.toLocaleDateString('pt-BR', options)
  } catch {
    return null
  }
}

function TripPriceDisplay({ trip }: { trip: TripListView }) {
  const useEstimated = ESTIMATED_STATUSES.includes(trip.status as (typeof ESTIMATED_STATUSES)[number])
  const price = useEstimated ? (trip.estimatedPrice ?? trip.price) : (trip.price ?? trip.estimatedPrice)
  const savings = useEstimated ? (trip.estimatedSavings ?? trip.savings) : (trip.savings ?? trip.estimatedSavings)

  if (price == null && savings == null) return null

  const exclusiveValue = price != null && savings != null && savings !== 0 ? price - savings : price
  if (exclusiveValue == null || exclusiveValue === 0) return null

  const showOriginal = price != null && price !== exclusiveValue

  return (
    <div className="mt-1 flex flex-col gap-0.5">
      {showOriginal && (
        <p className="text-xs text-white/80 line-through">{formatCurrency(price)}</p>
      )}
      <p className="text-sm font-semibold text-accent-300">{formatCurrency(exclusiveValue)}</p>
      <p className="text-[10px] text-white/70">Exclusivo para Círculo Evolved</p>
    </div>
  )
}

function TripTimelineCard({ trip, isPast, onIdeaClick }: { trip: TripListView; isPast: boolean; onIdeaClick?: (trip: TripListView) => void }) {
  const imageUrl = trip.images?.[0]?.url ?? PLACEHOLDER_IMAGE
  const href = getTripHref(trip)
  const dateLabel = formatDateRange(trip.startDate, trip.endDate) ?? trip.period
  const statusLabel = STATUS_LABELS[trip.status] ?? trip.status
  const isNewIdea = trip.status === 'NEW'

  const cardContent = (
    <div className={`group relative block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
      isPast ? 'opacity-80 hover:opacity-100' : ''
    } ${!isNewIdea ? 'cursor-pointer' : ''}`}>
      <div className="relative h-40 sm:h-44">
        <Image
          src={imageUrl}
          alt={trip.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          <h3 className="font-baloo font-bold text-lg line-clamp-2">{trip.title}</h3>
          {trip.destination && (
            <p className="text-sm text-white/80 mt-0.5">{trip.destination}</p>
          )}
          {dateLabel && (
            <p className="text-sm text-white/90 mt-0.5">{dateLabel}</p>
          )}
          <TripPriceDisplay trip={trip} />
          {statusLabel && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm w-fit">
              {statusLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (isNewIdea) {
    return (
      <button
        type="button"
        onClick={() => onIdeaClick?.(trip)}
        className="w-full text-left"
      >
        {cardContent}
      </button>
    )
  }

  if (href) {
    return (
      <Link href={href}>
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

function PlanNewTripCard() {
  return (
    <Link
      href="/app/viagens/planejar"
      className="group flex flex-col items-center justify-center min-h-[120px] rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 hover:border-primary-500 hover:bg-primary-100 transition-colors py-8"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2 group-hover:bg-primary-200 transition-colors">
        <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <span className="font-baloo font-semibold text-primary-700 text-center text-sm">
        Planejar nova viagem
      </span>
    </Link>
  )
}

const now = Date.now()

export function TripTimeline() {
  const [ideaModalTrip, setIdeaModalTrip] = useState<TripListView | null>(null)
  const { data, error, isLoading } = useSWR('trips', () => TripsApiService.getTrips())
  const trips = data?.trips ?? []
  const sortedTrips = sortTripsByDate(trips)
  const amountSaved = data?.amountSaved ?? null
  const estimatedAmountToBeSaved = data?.estimatedAmountToBeSaved ?? null
  const showSavings =
    (amountSaved != null && amountSaved !== 0) || (estimatedAmountToBeSaved != null && estimatedAmountToBeSaved !== 0)

  return (
    <section className="mt-10 pt-10 border-t border-gray-200">
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Meu calendário de viagens</h2>
        </div>
      </div>
      
      {showSavings && (
        <div className="mb-4 p-4 rounded-xl bg-accent-50 border border-accent-200">
          <p className="text-sm text-secondary-700 font-comfortaa">
            {amountSaved != null && amountSaved !== 0 && (
              <>
                Você já evitou <span className="font-semibold text-accent-600">{formatCurrency(amountSaved)}</span>
                {estimatedAmountToBeSaved != null && estimatedAmountToBeSaved !== 0 ? ' e ' : ' em comissões em suas viagens.'}
              </>
            )}
            {estimatedAmountToBeSaved != null && estimatedAmountToBeSaved !== 0 && (
              <>
                {amountSaved == null || amountSaved === 0 ? 'Você evitará ' : 'evitará mais '}
                <span className="font-semibold text-accent-600">{formatCurrency(estimatedAmountToBeSaved)}</span>
                {' '}em comissões com as viagens do seu calendário.
              </>
            )}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-5 py-6">
            <CircleLoader className="h-20 w-20" />
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-secondary-900">Carregando suas viagens</p>
              <p className="font-comfortaa text-xs text-secondary-600">Buscando o seu calendário de viagens.</p>
            </div>
          </div>
        </div>
      ) : error ? (
        <EmptyOrErrorState
          status="error"
          title="Não foi possível carregar suas viagens"
          description="Tente novamente em alguns instantes."
        />
      ) : (
        (() => {
          if (sortedTrips.length === 0) {
            return (
              <EmptyOrErrorState
                status="empty"
                title="Nenhuma viagem por aqui ainda"
                description="Quando você planejar uma nova viagem, ela vai aparecer neste calendário."
              />
            )
          }

          const monthGroups = groupTripsByMonth(sortedTrips)
          type Row = { type: 'month'; group: MonthGroup } | { type: 'card'; trip: TripListView } | { type: 'planejar' }
          const rows: Row[] = []
          monthGroups.forEach((group) => {
            rows.push({ type: 'month', group })
            group.trips.forEach((trip) => rows.push({ type: 'card', trip }))
          })
          rows.push({ type: 'planejar' })

          const CARD_ROW_H = 'h-40 sm:h-44'

          return (
            <div className="flex gap-4 relative">
              <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-primary-200" />
              <div className="relative z-10 flex flex-col flex-1 min-w-0 gap-4 pt-6">
                {rows.map((row) => {
                  if (row.type === 'month') {
                    const nowYearMonth = new Date().getFullYear() * 12 + new Date().getMonth() + 1
                    const isPast = row.group.key === '__past__' || (row.group.sortOrder < Infinity && row.group.sortOrder < nowYearMonth)
                    return (
                      <div key={row.group.key} className="flex gap-4 items-center">
                        <div className="w-8 shrink-0 flex justify-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                              isPast ? 'bg-primary-400 border-primary-400' : 'bg-white border-primary-500 shadow-sm'
                            }`}
                          />
                        </div>
                        <h3 className="text-sm font-semibold text-secondary-600 uppercase tracking-wider">
                          {row.group.label}
                        </h3>
                      </div>
                    )
                  }
                  if (row.type === 'card') {
                    const endTs = parseDateToTimestamp(row.trip.endDate) || getTripSortDate(row.trip)
                    const isPast = endTs > 0 && endTs < Infinity && endTs < now
                    return (
                      <div key={row.trip.id} className={`flex gap-4 ${CARD_ROW_H}`}>
                        <div className="w-8 shrink-0 flex justify-center" />
                        <div className="flex-1 min-h-0">
                          <TripTimelineCard
                            trip={row.trip}
                            isPast={isPast}
                            onIdeaClick={(t) => setIdeaModalTrip(t)}
                          />
                        </div>
                      </div>
                    )
                  }
                  return (
                    <div key="planejar" className="flex gap-4 items-start pt-2">
                      <div className="w-8 shrink-0 flex justify-center pt-4">
                        <div className="w-4 h-4 rounded-full border-2 border-dashed border-primary-400 shrink-0" />
                      </div>
                      <div className="flex-1 pt-2">
                        <PlanNewTripCard />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()
      )}

      {ideaModalTrip && (
        <TripIdeaModal trip={ideaModalTrip} onClose={() => setIdeaModalTrip(null)} />
      )}
    </section>
  )
}
