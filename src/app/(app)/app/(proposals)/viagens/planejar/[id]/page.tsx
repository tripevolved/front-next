'use client'

import { useRef, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAppStore } from '@/core/store'
import { TripsApiService } from '@/clients/trips'
import { TripProposalContent } from '@/components/results/TripProposalContent'
import TripPlanningDecisionModal from '@/components/TripPlanningDecisionModal'
import type { TripProposal } from '@/core/types'

export default function PlanejarResultsPage() {
  const params = useParams()
  const id = params?.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tripProposal, setTripProposal] = useState<TripProposal | null>(null)
  const [isWantToGoModalOpen, setIsWantToGoModalOpen] = useState(false)
  const selectedDestination = useRef<string>('')
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      setError(true)
      return
    }
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true

    const fetchTripProposal = async () => {
      const tid = useAppStore.getState().travelerState?.id ?? ''
      try {
        const proposal = await TripsApiService.getTripMatches(id, tid || undefined)
        if (proposal && proposal.mainChoice) {
          setTripProposal(proposal)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Failed to fetch trip proposal:', err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    // Defer so store (e.g. persist) has rehydrated before reading travelerId
    const t = setTimeout(fetchTripProposal, 0)
    return () => clearTimeout(t)
  }, [id])

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header (replicated from ResultsTrip) */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/app/viagens/planejar"
            className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao planejamento
          </Link>
        </div>
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-baloo font-bold text-secondary-900">
            Sua viagem ideal é para...
          </h1>
        </div>

        <TripProposalContent
          isLoading={isLoading}
          tripProposal={tripProposal}
          onPlanningTripToGo={setIsWantToGoModalOpen}
          selectedDestinationRef={selectedDestination}
        />
      </div>

      <TripPlanningDecisionModal
        isOpen={isWantToGoModalOpen}
        onClose={() => {
          selectedDestination.current = ''
          setIsWantToGoModalOpen(false)
        }}
        selectedDestination={selectedDestination.current}
        onContactExpert={() => {}}
        onWantToGo={async () => Promise.resolve()}
        isPublic={false}
      />
    </div>
  )
}
