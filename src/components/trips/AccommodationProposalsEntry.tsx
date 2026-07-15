'use client'

import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { TripsApiService } from '@/clients/trips'
import type {
  TripAccommodationProposalView,
  TripAccommodationProposalsResponse,
} from '@/core/types/recommendations'

function normalizeProposalsResponse(data: unknown): TripAccommodationProposalsResponse {
  if (!data || typeof data !== 'object') {
    return { proposals: [] }
  }

  const raw = data as Record<string, unknown>
  const proposals = raw.proposals ?? raw.Proposals ?? []
  return {
    proposals: Array.isArray(proposals) ? (proposals as TripAccommodationProposalView[]) : [],
  }
}

export function useAccommodationProposals(
  tripId: string,
  hasDestination: boolean,
  hasTravelIntent: boolean,
) {
  const recommendAttemptedRef = useRef(false)
  const [isRecommending, setIsRecommending] = useState(false)

  const canFetchProposals = hasDestination && hasTravelIntent

  const swr = useSWR<TripAccommodationProposalsResponse>(
    canFetchProposals ? ['trip-accommodation-proposals', tripId] : null,
    async () => normalizeProposalsResponse(await TripsApiService.getTripAccommodationProposals(tripId)),
    { revalidateOnFocus: false },
  )

  useEffect(() => {
    recommendAttemptedRef.current = false
    setIsRecommending(false)
  }, [tripId])

  useEffect(() => {
    if (!canFetchProposals || swr.isLoading) return
    if ((swr.data?.proposals?.length ?? 0) > 0) return
    if (swr.error) return
    if (recommendAttemptedRef.current) return

    recommendAttemptedRef.current = true
    setIsRecommending(true)

    TripsApiService.recommendTripAccommodationProposals(tripId)
      .then(async (response) => {
        const normalized = normalizeProposalsResponse(response)
        await swr.mutate(normalized, { revalidate: false })
      })
      .catch(() => {
        recommendAttemptedRef.current = false
      })
      .finally(() => {
        setIsRecommending(false)
      })
  }, [canFetchProposals, swr.isLoading, swr.data?.proposals?.length, swr.error, swr.mutate, tripId])

  const isGenerating = canFetchProposals && (swr.isLoading || isRecommending)

  return {
    ...swr,
    data: swr.data ? normalizeProposalsResponse(swr.data) : swr.data,
    isGenerating,
  }
}

type EntryProps = {
  proposalCount: number
  isGenerating: boolean
  hasError: boolean
  onOpenProposals: () => void
}

export function AccommodationProposalsEntry({
  proposalCount,
  isGenerating,
  hasError,
  onOpenProposals,
}: EntryProps) {
  if (hasError && proposalCount === 0) return null

  return (
    <section className="rounded-2xl border border-secondary-200 bg-white p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-baloo text-xl font-bold text-secondary-900">Hospedagens recomendadas</h2>
          <p className="font-comfortaa text-sm text-secondary-600 mt-1">
            {isGenerating
              ? 'Estamos selecionando hospedagens alinhadas ao seu perfil de viagem...'
              : proposalCount > 0
                ? `${proposalCount} opções curadas com base na sua intenção de viagem.`
                : 'Em breve você verá sugestões personalizadas aqui.'}
          </p>
        </div>

        {isGenerating ? (
          <div className="flex justify-center sm:justify-end py-2">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-500" />
          </div>
        ) : proposalCount > 0 ? (
          <button
            type="button"
            onClick={onOpenProposals}
            className="shrink-0 font-baloo bg-accent-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-600 transition-colors"
          >
            Ver recomendações
          </button>
        ) : null}
      </div>
    </section>
  )
}
