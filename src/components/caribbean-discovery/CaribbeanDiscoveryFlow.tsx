'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuizFlow } from '@/components/quiz'
import type { QuizAnswers } from '@/components/quiz'
import { LocalStorageService } from '@/clients/local'
import { TripsApiService } from '@/clients/trips'
import {
  DestinationProposalScreen,
  FunnelScroll,
  IntentPreviewScreen,
  LeadCaptureStep,
  LoadingSpinner,
  useRecommendationFunnel,
} from '@/components/recommendation-funnel'
import {
  buildCaribbeanPhase1QuizConfig,
  buildCaribbeanPhase2QuizConfig,
  extractOptionalFreeText,
} from './questions'
import { buildCaribbeanDiscoveryTripRequest } from './buildCaribbeanDiscoveryTripRequest'

const CARIBBEAN_COPY = {
  intentPreviewSubtitle: 'Na próxima etapa, vamos recomendar destinos curados do Caribe para vocês.',
  destinationProposalEyebrow: 'Destinos curados para vocês',
  destinationProposalTitle: 'Para onde o Caribe chama?',
  destinationProposalHeroImage: '/assets/consultoria/caribe/hero.jpg',
  destinationProposalHeroAlt: 'Caribe',
}

type Phase =
  | 'quiz_phase_1'
  | 'intent_preview'
  | 'quiz_phase_2'
  | 'destination_proposal'
  | 'lead'
  | 'creating_trip'

type Props = {
  onClose: () => void
}

export function CaribbeanDiscoveryFlow({ onClose }: Props) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('quiz_phase_1')
  const [phase1Answers, setPhase1Answers] = useState<QuizAnswers | null>(null)
  const [phase2Answers, setPhase2Answers] = useState<QuizAnswers | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const {
    preRecommendation,
    destinationProposal,
    error,
    setError,
    isLoading,
    buildTravelIntent,
    buildDestinationRecommendations,
  } = useRecommendationFunnel()

  const handlePhase1Complete = useCallback(
    async (answers: QuizAnswers) => {
      setPhase1Answers(answers)
      const response = await buildTravelIntent({
        quizAnswers: answers,
        optionalFreeText: extractOptionalFreeText(),
        region: 'caribe',
        leadContext: { source: 'consultoria-caribe' },
      })
      if (response) setPhase('intent_preview')
    },
    [buildTravelIntent],
  )

  const handlePhase2Complete = useCallback(
    async (answers: QuizAnswers) => {
      if (!preRecommendation?.travelIntent) return
      setPhase2Answers(answers)
      const mergedAnswers = { ...(phase1Answers ?? {}), ...answers }
      const response = await buildDestinationRecommendations({
        travelIntent: preRecommendation.travelIntent,
        quizAnswers: mergedAnswers,
        optionalFreeText: extractOptionalFreeText(),
        region: 'caribe',
      })
      if (response) {
        setSelectedDestination(response.mainChoice?.destinationUniqueName ?? null)
        setPhase('destination_proposal')
      }
    },
    [buildDestinationRecommendations, phase1Answers, preRecommendation],
  )

  const handleCreateTrip = useCallback(async () => {
    if (!preRecommendation?.travelIntent || !phase1Answers || !phase2Answers || !destinationProposal || !selectedDestination) {
      return
    }

    const traveler = LocalStorageService.getTraveler()
    if (!traveler?.id) {
      setError('Não foi possível identificar seu cadastro. Tente novamente.')
      return
    }

    setPhase('creating_trip')
    setError(null)

    try {
      const request = buildCaribbeanDiscoveryTripRequest({
        travelerId: traveler.id,
        travelIntent: preRecommendation.travelIntent,
        quizPhase1: phase1Answers,
        quizPhase2: phase2Answers,
        destinationProposal,
        selectedDestinationUniqueName: selectedDestination,
      })

      const { id } = await TripsApiService.createTrip(request)
      const returnTo = encodeURIComponent(`/app/viagens/${id}`)
      router.push(`/auth/login?returnTo=${returnTo}`)
    } catch {
      setError('Não foi possível criar sua viagem. Tente novamente.')
      setPhase('lead')
    }
  }, [destinationProposal, phase1Answers, phase2Answers, preRecommendation, router, selectedDestination, setError])

  const phase1Config = useMemo(
    () => buildCaribbeanPhase1QuizConfig({ onComplete: handlePhase1Complete, onExit: onClose }),
    [handlePhase1Complete, onClose],
  )

  const phase2Config = useMemo(
    () => buildCaribbeanPhase2QuizConfig({ onComplete: handlePhase2Complete, onExit: onClose }),
    [handlePhase2Complete, onClose],
  )

  if (phase === 'quiz_phase_1') {
    return (
      <FunnelScroll>
        {error && <div className="shrink-0 p-4 text-center text-red-600 font-comfortaa text-sm">{error}</div>}
        <QuizFlow config={phase1Config} embedded />
      </FunnelScroll>
    )
  }

  if (phase === 'intent_preview' && preRecommendation) {
    return (
      <FunnelScroll>
        <IntentPreviewScreen
          compact
          intentSummary={preRecommendation.preview.intentSummary || preRecommendation.travelIntent.intent_summary}
          subtitle={CARIBBEAN_COPY.intentPreviewSubtitle}
          isLoading={isLoading}
          onContinue={() => setPhase('quiz_phase_2')}
        />
      </FunnelScroll>
    )
  }

  if (phase === 'quiz_phase_2') {
    return (
      <FunnelScroll>
        {error && <div className="shrink-0 p-4 text-center text-red-600 font-comfortaa text-sm">{error}</div>}
        {isLoading ? <LoadingSpinner /> : <QuizFlow config={phase2Config} embedded />}
      </FunnelScroll>
    )
  }

  if (phase === 'destination_proposal' && destinationProposal) {
    return (
      <FunnelScroll>
        <DestinationProposalScreen
          compact
          proposal={destinationProposal}
          intentSummary={preRecommendation?.travelIntent.intent_summary}
          selectedUniqueName={selectedDestination}
          onSelect={setSelectedDestination}
          onContinue={() => setPhase('lead')}
          eyebrow={CARIBBEAN_COPY.destinationProposalEyebrow}
          title={CARIBBEAN_COPY.destinationProposalTitle}
          heroImageSrc={CARIBBEAN_COPY.destinationProposalHeroImage}
          heroImageAlt={CARIBBEAN_COPY.destinationProposalHeroAlt}
        />
      </FunnelScroll>
    )
  }

  if (phase === 'lead' || phase === 'creating_trip') {
    return (
      <FunnelScroll>
        <LeadCaptureStep
          error={error}
          isCreating={phase === 'creating_trip'}
          funnelMetadata={[
            { key: 'funnel', value: 'caribbean-discovery-v1', keyDescription: 'Funil' },
            { key: 'destination', value: selectedDestination ?? '', keyDescription: 'Destino escolhido' },
          ]}
          onSuccess={handleCreateTrip}
        />
      </FunnelScroll>
    )
  }

  return null
}
