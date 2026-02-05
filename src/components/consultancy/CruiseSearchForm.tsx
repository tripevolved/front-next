'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Button from '@/components/common/Button'
import { CruisesApiService } from '@/clients/cruises'
import type { CruiseData } from '@/clients/cruises/cruises'
import type { CruisesSearchParams } from '@/clients/cruises/cruises'
import { CruiseCard } from '@/components/cruises/CruiseCard'
import CruiseDetailsModal from '@/components/cruises/CruiseDetailsModal'
import Image from 'next/image'

const DESTINATIONS = [
  { value: 'Mediterranean', label: 'Mediterrâneo' },
  { value: 'Caribbean', label: 'Caribe' }
] as const

const MONTH_LABELS = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
]

const TYPE_OPTIONS = [
  { id: 'relax', label: 'Bem-estar e tranquilidade' },
  { id: 'destination', label: 'Viver o destino' },
  { id: 'uniqueBeauty', label: 'Beleza única' }
] as const

/** Key for selected month: "year-monthIndex" e.g. "2025-0" */
function monthKey(year: number, monthIndex: number) {
  return `${year}-${monthIndex}`
}

/** Convert "year-monthIndex" set to "YYYY-MM" array for API */
function monthsSetToApi(selectedMonths: Set<string>): string[] {
  if (selectedMonths.size === 0) return []
  return Array.from(selectedMonths)
    .map((key) => {
      const [y, m] = key.split('-').map(Number)
      return `${y}-${String(m + 1).padStart(2, '0')}`
    })
    .sort()
}

interface CruiseSearchFormProps {
  /** Optional, e.g. for analytics. CTA only fetches cruises. */
  onCtaClick?: () => void
}

const LIMIT = 6

export default function CruiseSearchForm({ onCtaClick }: CruiseSearchFormProps) {
  const [destinations, setDestinations] = useState<Set<string>>(new Set())
  const [selectedMonths, setSelectedMonths] = useState<Set<string>>(new Set())
  const [durationDays, setDurationDays] = useState(7)
  const [types, setTypes] = useState<Set<string>>(new Set())
  const [monthModalOpen, setMonthModalOpen] = useState(false)
  const [cruises, setCruises] = useState<CruiseData[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCruiseUniqueName, setSelectedCruiseUniqueName] = useState<string | undefined>()
  const lastParamsRef = useRef<CruisesSearchParams>({})

  const years = useMemo(() => {
    const current = new Date().getFullYear()
    return [current, current + 1, current + 2]
  }, [])

  const buildSearchParams = useMemo(() => {
    return (pageNum = 1): CruisesSearchParams => ({
      limit: LIMIT,
      page: pageNum,
      ...(destinations.size > 0 && { destinations: Array.from(destinations) }),
      ...(durationDays > 0 && { duration: durationDays }),
      ...(selectedMonths.size > 0 && { months: monthsSetToApi(selectedMonths) }),
      ...(types.size > 0 && { types: Array.from(types) })
    })
  }, [destinations, durationDays, selectedMonths, types])

  const fetchCruises = async (params: CruisesSearchParams, append = false) => {
    if (!append) {
      lastParamsRef.current = params
      setLoading(true)
      setError(null)
    }
    try {
      console.log('fetchCruises', params)
      const res = await CruisesApiService.getCruises(params)
      if (append) {
        setCruises(prev => [...prev, ...res.cruises])
        setLoadingMore(false)
      } else {
        setCruises(res.cruises)
      }
      setPage(res.page)
      setTotalPages(res.totalPages)
    } catch (err) {
      console.error('Error fetching cruises:', err)
      setError('Houve um problema ao carregar seus cruzeiros. Por favor, tente novamente.')
      if (!append) setCruises([])
      setLoadingMore(false)
    } finally {
      if (!append) setLoading(false)
    }
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    if (nextPage > totalPages || loadingMore) return
    setLoadingMore(true)
    const params = buildSearchParams(nextPage)
    lastParamsRef.current = params
    fetchCruises(params, true)
  }

  useEffect(() => {
    fetchCruises(buildSearchParams(1))
  }, [])

  const handleDiscoverClick = () => {
    fetchCruises(buildSearchParams(1))
    onCtaClick?.()
  }

  const handleCruiseClick = (uniqueName: string) => {
    setSelectedCruiseUniqueName(uniqueName)
  }

  const handleCloseCruiseModal = () => {
    setSelectedCruiseUniqueName(undefined)
  }

  const toggleDestination = (value: string) => {
    setDestinations(prev => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }

  const toggleMonthInModal = (year: number, monthIndex: number) => {
    const key = monthKey(year, monthIndex)
    setSelectedMonths(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleType = (id: string) => {
    setTypes(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const monthButtonLabel = selectedMonths.size === 0
    ? 'Mês'
    : `${selectedMonths.size} meses selecionado${selectedMonths.size > 1 ? 's' : ''}`

  return (
    <section className="flex flex-col bg-white">
      <div className="text-center pt-8 pb-4">
        <h2 className="font-baloo text-4xl md:text-5xl font-bold text-gray-800">
          Qual seu próximo cruzeiro?
        </h2>
      </div>
      <div className="md:p-8 px-4 py-4 flex flex-col gap-6 container mx-auto">
        <div className="w-full max-w-4xl mx-auto bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4">
          {/* Row: Destinations + Mês (opens modal) */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-comfortaa text-secondary-600 shrink-0">Destino</span>
            <div className="flex gap-1.5">
              {DESTINATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => toggleDestination(d.value)}
                  className={`px-3 py-1.5 rounded-full font-comfortaa text-xs font-medium transition-all ${
                    destinations.has(d.value) ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <span className="text-gray-300 mx-1">|</span>
            <button
              type="button"
              onClick={() => setMonthModalOpen(true)}
              className="px-3 py-1.5 rounded-full font-comfortaa text-xs font-medium bg-white border border-gray-200 hover:border-gray-300 text-secondary-700"
            >
              {monthButtonLabel}
            </button>
          </div>

          {/* Row: Duration slider + Types */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-xs font-comfortaa text-secondary-600 shrink-0">Duração</span>
              <input
                type="range"
                min={1}
                max={15}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="flex-1 max-w-32 h-1.5 rounded-full accent-primary-500"
              />
              <span className="text-xs font-comfortaa text-secondary-900 tabular-nums w-8">
                {durationDays < 15 ? `${durationDays} noites` : '15+ noites'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-comfortaa text-secondary-600 shrink-0">Estilo</span>
              {TYPE_OPTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleType(id)}
                  className={`px-2.5 py-1.5 rounded-full font-comfortaa text-xs font-medium transition-all ${
                    types.has(id) ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-1 flex justify-center">
            <Button
              type="button"
              onClick={handleDiscoverClick}
              className="font-baloo bg-accent-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent-600 transition-all"
            >
              Descobrir cruzeiros
            </Button>
          </div>
        </div>
      </div>

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 font-comfortaa text-lg">{error}</p>
            <button
              onClick={() => fetchCruises(buildSearchParams(1))}
              className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
            <p className="mt-2 text-gray-600 font-comfortaa">Carregando cruzeiros...</p>
          </div>
        )}
        {!loading && !error && cruises.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Image src="/assets/home/ship.svg" alt="Nenhum cruzeiro encontrado" width={100} height={100} />
            <p className="font-comfortaa text-lg text-gray-600 max-w-md mb-2">
              Nenhum cruzeiro encontrado para os filtros selecionados.
            </p>
            <p className="font-comfortaa text-base text-gray-500 max-w-md">
              Altere destino, mês, duração ou estilo e clique em &quot;Descobrir cruzeiros&quot; para buscar novamente.
            </p>
          </div>
        )}
        {!loading && !error && cruises.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cruises.map((cruise) => (
                <CruiseCard
                  key={cruise.uniqueName}
                  handleClick={handleCruiseClick}
                  cruise={cruise}
                />
              ))}
            </div>
            {page < totalPages && (
              <div className="flex justify-center pt-8">
                <Button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="font-baloo bg-primary-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? 'Carregando...' : 'Carregar mais'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Month/Year modal */}
      {monthModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setMonthModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-baloo text-lg font-semibold text-secondary-900">Mês e ano</h3>
              <button
                type="button"
                onClick={() => setMonthModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              {years.map((year) => (
                <div key={year} className="mb-6 last:mb-0">
                  <p className="text-sm font-comfortaa font-semibold text-secondary-700 mb-2">{year}</p>
                  <div className="flex flex-wrap gap-2">
                    {MONTH_LABELS.map((label, monthIndex) => {
                      const key = monthKey(year, monthIndex)
                      const selected = selectedMonths.has(key)
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleMonthInModal(year, monthIndex)}
                          className={`px-3 py-2 rounded-full font-comfortaa text-xs font-medium transition-all ${
                            selected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Button
                type="button"
                onClick={() => setMonthModalOpen(false)}
                className="w-full font-baloo bg-primary-500 text-white py-2 rounded-full text-sm font-semibold"
              >
                Concluir
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedCruiseUniqueName && (
        <CruiseDetailsModal
          isOpen={!!selectedCruiseUniqueName}
          handleClose={handleCloseCruiseModal}
          uniqueName={selectedCruiseUniqueName}
        />
      )}
    </section>
  )
}
