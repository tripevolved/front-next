'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { useAppStore } from '@/core/store'
import { TripsApiService } from '@/clients/trips'
import { TripDestinationProposalView } from '@/components/trips/TripDestinationProposalView'
import type { TripProposal } from '@/core/types'

function fetcherTripProposal(tripId: string) {
  const travelerId = useAppStore.getState().travelerState?.id ?? undefined
  return TripsApiService.getTripMatches(tripId, travelerId)
}

export default function PlanejarResultsPage() {
  const params = useParams()
  const id = (params?.id as string) ?? ''

  const { data: tripProposal, error: fetchError, isLoading } = useSWR<TripProposal>(
    id ? ['trip-proposal', id] : null,
    () => fetcherTripProposal(id),
    { revalidateOnFocus: false }
  )

  const hasEmptyRecommendation = Boolean(id) && tripProposal != null && !tripProposal.mainChoice
  const hasFetchFailure = !id || fetchError

  if (hasFetchFailure && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <Image
            src="/assets/states/error-state.svg"
            alt=""
            width={240}
            height={240}
            className="object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900">Algo deu errado</h1>
          <p className="text-gray-600">
            Não foi possível carregar as recomendações da sua viagem. Tente novamente ou volte ao planejamento.
          </p>
          <Link
            href="/app/viagens/planejar"
            className="inline-flex items-center gap-2 mt-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao planejamento
          </Link>
        </div>
      </div>
    )
  }

  if (hasEmptyRecommendation && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <Image
            src="/assets/states/success-state.svg"
            alt=""
            width={240}
            height={240}
            className="object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900">Recomendações em breve</h1>
          <p className="text-gray-600">
            Um especialista vai revisar sua viagem e retornar com as recomendações em até 48 horas.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 mt-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao painel
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <TripDestinationProposalView
        tripId={id}
        tripProposal={tripProposal ?? null}
        isLoading={isLoading}
      />

      <div className="text-center py-12 bg-white">
        <Link
          href="/app/viagens/planejar"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Planejar novamente
        </Link>
      </div>
    </>
  )
}
