'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TripsApiService } from '@/clients/trips'
import type { DestinationProposalResponse } from '@/core/types/recommendations'
import type { TripProposal } from '@/core/types/trip'
import { DestinationProposalScreen } from '@/components/recommendation-funnel/DestinationProposalScreen'
import { mapTripProposalToDestinationProposal } from '@/utils/trips/mapTripProposalToDestinationProposal'

type Props = {
  tripId: string
  tripProposal: TripProposal | null
  isLoading: boolean
}

export function TripDestinationProposalView({ tripId, tripProposal, isLoading }: Props) {
  const router = useRouter()
  const [selectedUniqueName, setSelectedUniqueName] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const proposal: DestinationProposalResponse | null = useMemo(() => {
    if (!tripProposal) return null
    return tripProposal.destinationProposal ?? mapTripProposalToDestinationProposal(tripProposal)
  }, [tripProposal])

  const intentSummary = tripProposal?.intentSummary ?? undefined

  const selectedDestinationId = useMemo(() => {
    if (!proposal || !selectedUniqueName) return null
    const all = [proposal.mainChoice, ...(proposal.otherChoices ?? [])].filter(Boolean)
    const match = all.find((c) => c!.destinationUniqueName === selectedUniqueName)
    return match?.destinationId ?? null
  }, [proposal, selectedUniqueName])

  const handleContinue = async () => {
    if (!selectedDestinationId || !tripId) return
    setIsSaving(true)
    setSaveError(null)
    try {
      await TripsApiService.setDestinationIdForTrip({
        tripId,
        tripDestination: { destinationId: selectedDestinationId },
      })
      router.push(`/app/viagens/${tripId}/itinerario`)
    } catch {
      setSaveError('Não foi possível salvar o destino. Tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center font-comfortaa text-secondary-600">
        Carregando...
      </div>
    )
  }

  if (!proposal || !proposal.mainChoice) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {saveError ? (
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-comfortaa">
            {saveError}
          </div>
        </div>
      ) : null}

      <DestinationProposalScreen
        proposal={proposal}
        intentSummary={intentSummary}
        selectedUniqueName={selectedUniqueName}
        onSelect={setSelectedUniqueName}
        onContinue={handleContinue}
        continueLabel="Continuar com este destino"
        isContinueLoading={isSaving}
        topBar={
          <Link href="/app" className="font-comfortaa text-sm font-semibold text-primary-600 hover:text-primary-700">
            ← Voltar ao painel
          </Link>
        }
      />
    </div>
  )
}

