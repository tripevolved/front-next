'use client'

import { useEffect, useState } from 'react'
import { CruisesApiService } from '@/clients/cruises'
import type { CruiseData } from '@/clients/cruises/cruises'
import { formatCruiseDateParam } from '@/clients/cruises/cruises'
import { CruiseCard } from '@/components/cruises/CruiseCard'
import CruiseDetailsModal from '@/components/cruises/CruiseDetailsModal'

const FEATURED_SAILINGS = [
  {
    uniqueName: 'barcelona-a-palermo-com-ibiza-e-outras-joias-durante-a-temporada-das-trufas',
    startDate: '2026-10-12',
    endDate: '2026-10-21',
  },
  {
    uniqueName: 'sul-do-caribe-com-as-ilhas-abc-e-st.-lucia',
    startDate: '2027-01-04',
    endDate: '2027-01-15',
  },
  {
    uniqueName: 'intensivo-de-brasil:-uma-experiencia-refinada-do-rio-a-buenos-aires',
    startDate: '2027-02-07',
    endDate: '2027-02-17',
  },
] as const

function toDateOnlyString(date: Date | string): string {
  if (typeof date === 'string') {
    return date.split('T')[0]
  }
  return formatCruiseDateParam(date)
}

function matchSailing(
  cruises: CruiseData[],
  uniqueName: string,
  startDate: string,
  endDate: string
): CruiseData | undefined {
  return cruises.find(
    (cruise) =>
      cruise.uniqueName === uniqueName &&
      toDateOnlyString(cruise.departureDate) === startDate &&
      toDateOnlyString(cruise.arrivalDate) === endDate
  )
}

export default function FeaturedExtraordinaryCruises() {
  const [cruises, setCruises] = useState<CruiseData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCruise, setSelectedCruise] = useState<{
    uniqueName: string
    startDate: string
    endDate: string
  } | null>(null)

  const fetchCruises = async () => {
    setLoading(true)
    setError(null)
    try {
      const uniqueNames = FEATURED_SAILINGS.map((s) => s.uniqueName)
      const res = await CruisesApiService.getCruises({
        uniqueNames: [...uniqueNames],
        limit: 10,
      })
      const matched = FEATURED_SAILINGS.map((sailing) =>
        matchSailing(res.cruises, sailing.uniqueName, sailing.startDate, sailing.endDate)
      ).filter((c): c is CruiseData => c != null)
      setCruises(matched)
    } catch (err) {
      console.error('Error fetching featured cruises:', err)
      setError('Houve um problema ao carregar seus cruzeiros. Por favor, tente novamente.')
      setCruises([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCruises()
  }, [])

  const handleCardClick = (uniqueName: string) => {
    const sailing = FEATURED_SAILINGS.find((s) => s.uniqueName === uniqueName)
    const cruise = cruises.find((c) => c.uniqueName === uniqueName)
    if (!cruise) return
    setSelectedCruise({
      uniqueName,
      startDate: sailing?.startDate ?? toDateOnlyString(cruise.departureDate),
      endDate: sailing?.endDate ?? toDateOnlyString(cruise.arrivalDate),
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="text-center mb-12">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Cruzeiros em destaque
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg max-w-2xl mx-auto">
            Uma seleção especial de roteiros extraordinários para a sua próxima jornada.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-secondary-600 font-comfortaa mb-4">{error}</p>
            <button
              onClick={fetchCruises}
              className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors font-baloo"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && cruises.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cruises.map((cruise) => (
              <CruiseCard
                key={`${cruise.uniqueName}-${toDateOnlyString(cruise.departureDate)}`}
                cruise={cruise}
                handleClick={handleCardClick}
              />
            ))}
          </div>
        )}

        {!loading && !error && cruises.length === 0 && (
          <p className="text-center text-secondary-600 font-comfortaa py-12">
            Nenhum cruzeiro disponível no momento.
          </p>
        )}
      </div>

      <CruiseDetailsModal
        isOpen={!!selectedCruise}
        handleClose={() => setSelectedCruise(null)}
        uniqueName={selectedCruise?.uniqueName}
        startDate={selectedCruise?.startDate}
        endDate={selectedCruise?.endDate}
      />
    </section>
  )
}
