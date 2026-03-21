'use client'

import { useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { useAppStore } from '@/core/store'
import { TripsApiService } from '@/clients/trips'
import { TripProposalContent } from '@/components/results/TripProposalContent'
import TripPlanningDecisionModal from '@/components/TripPlanningDecisionModal'
import type { TripProposal } from '@/core/types'

function fetcherTripProposal(tripId: string) {
  const travelerId = useAppStore.getState().travelerState?.id ?? undefined
  return TripsApiService.getTripMatches(tripId, travelerId)
}

export default function PlanejarResultsPage() {
  const router = useRouter()
  const params = useParams()
  const id = (params?.id as string) ?? ''

  const { data: tripProposal, error: fetchError, isLoading } = useSWR<TripProposal>(
    id ? ['trip-proposal', id] : null,
    () => fetcherTripProposal(id),
    { revalidateOnFocus: false }
  )

  const [isWantToGoModalOpen, setIsWantToGoModalOpen] = useState(false)
  const selectedDestination = useRef<string>('')

  const error = !id || fetchError || (tripProposal != null && !tripProposal.mainChoice)

  if (error && !isLoading) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Primary background top 30% */}
      <div className="h-[30vh] min-h-[200px] bg-primary-500">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="w-full max-w-4xl mx-auto flex items-center gap-3">
            <Link
              href="/app"
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/50 text-white hover:text-white/90 hover:border-white/80 transition-colors flex-shrink-0"
              aria-label="Voltar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl md:text-2xl font-baloo font-normal text-white">
              Sua viagem ideal é para...
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 pb-16">
        <TripProposalContent
          isLoading={isLoading}
          tripProposal={tripProposal ?? null}
          onPlanningTripToGo={setIsWantToGoModalOpen}
          selectedDestinationRef={selectedDestination}
        />

        <div className="text-center mt-12">
          <Link
            href="/app/viagens/planejar"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Planejar novamente
          </Link>
        </div>
      </div>

      <TripPlanningDecisionModal
        isOpen={isWantToGoModalOpen}
        onClose={() => {
          selectedDestination.current = ''
          setIsWantToGoModalOpen(false)
        }}
        selectedDestination={selectedDestination.current}
        onContactExpert={() => {}}
        onWantToGo={async (destinationId: string) => {
          if (!id || !destinationId) return
          try {
            await TripsApiService.setDestinationIdForTrip({
              tripId: id,
              tripDestination: { destinationId },
            })
            selectedDestination.current = ''
            setIsWantToGoModalOpen(false)
            router.push(`/app/viagens/${id}/proposta`)
          } catch (err) {
            console.error('Failed to set destination for trip:', err)
          }
        }}
        isPublic={false}
        showShareButton={false}
      />
    </div>
  )
}
