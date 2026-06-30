'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/core/store'
import { QuizFlow } from '@/components/quiz'
import type { QuizAnswers } from '@/components/quiz'
import { TripsApiService } from '@/clients/trips'
import {
  DestinationProposalScreen,
  IntentPreviewScreen,
  LoadingSpinner,
  useRecommendationFunnel,
} from '@/components/recommendation-funnel'
import { buildTripPlanningQuizConfig } from './questions'
import { DestinationPreferenceStep } from './DestinationPreferenceStep'
import { buildAppPlanejarTripRequest } from './buildAppPlanejarTripRequest'
import { extractPlanejarOptionalFreeText } from './extractOptionalFreeText'

const PLANEJAR_COPY = {
  intentPreviewSubtitle: 'Na próxima etapa, vamos recomendar destinos curados para a sua viagem.',
  destinationProposalEyebrow: 'Destinos curados para vocês',
  destinationProposalTitle: 'Para onde sua viagem nos leva?',
}

type Phase =
  | 'quiz'
  | 'building_intent'
  | 'intent_preview'
  | 'destination_preference'
  | 'building_destinations'
  | 'destination_proposal'
  | 'creating_trip'

export function TripPlanningQuizFlow() {
  const router = useRouter()
  const travelerId = useAppStore((state) => state.travelerState?.id ?? '')
  const [phase, setPhase] = useState<Phase>('quiz')
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null)
  const [preferenceAnswers, setPreferenceAnswers] = useState<QuizAnswers | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [createError, setCreateError] = useState<string | null>(null)

  const {
    preRecommendation,
    destinationProposal,
    error,
    isLoading,
    buildTravelIntent,
    buildDestinationRecommendations,
  } = useRecommendationFunnel()

  const handleQuizComplete = useCallback(
    async (answers: QuizAnswers) => {
      setQuizAnswers(answers)
      setPhase('building_intent')
      const response = await buildTravelIntent({
        quizAnswers: answers,
        optionalFreeText: extractPlanejarOptionalFreeText(answers),
        leadContext: { source: 'app-planejar' },
      })
      if (response) {
        setPhase('intent_preview')
      } else {
        setPhase('quiz')
      }
    },
    [buildTravelIntent],
  )

  const handlePreferenceComplete = useCallback(
    async (answers: QuizAnswers) => {
      if (!preRecommendation?.travelIntent || !quizAnswers) return
      setPreferenceAnswers(answers)
      setPhase('building_destinations')
      const mergedAnswers = { ...quizAnswers, ...answers }
      const response = await buildDestinationRecommendations({
        travelIntent: preRecommendation.travelIntent,
        quizAnswers: mergedAnswers,
        optionalFreeText: extractPlanejarOptionalFreeText(quizAnswers),
      })
      if (response) {
        setSelectedDestination(response.mainChoice?.destinationUniqueName ?? null)
        setPhase('destination_proposal')
      } else {
        setPhase('destination_preference')
      }
    },
    [buildDestinationRecommendations, preRecommendation, quizAnswers],
  )

  const handleCreateTrip = useCallback(async () => {
    if (
      !travelerId ||
      !preRecommendation?.travelIntent ||
      !quizAnswers ||
      !preferenceAnswers ||
      !destinationProposal ||
      !selectedDestination
    ) {
      setCreateError('Não foi possível criar sua viagem. Verifique se você está logado e tente novamente.')
      return
    }

    setPhase('creating_trip')
    setCreateError(null)

    try {
      const request = buildAppPlanejarTripRequest({
        travelerId,
        quizAnswers,
        destinationPreference: preferenceAnswers,
        travelIntent: preRecommendation.travelIntent,
        destinationProposal,
        selectedDestinationUniqueName: selectedDestination,
      })

      const { id } = await TripsApiService.createTrip(request)
      router.push(`/app/viagens/${id}`)
    } catch {
      setCreateError('Não foi possível criar sua viagem. Tente novamente.')
      setPhase('destination_proposal')
    }
  }, [
    destinationProposal,
    preferenceAnswers,
    preRecommendation,
    quizAnswers,
    router,
    selectedDestination,
    travelerId,
  ])

  const quizConfig = useMemo(
    () => buildTripPlanningQuizConfig({ onQuizComplete: handleQuizComplete }),
    [handleQuizComplete],
  )

  const displayError = error ?? createError

  if (phase === 'quiz') {
    return (
      <>
        {displayError && (
          <div className="shrink-0 p-4 text-center text-red-600 font-comfortaa text-sm">{displayError}</div>
        )}
        <QuizFlow config={quizConfig} />
      </>
    )
  }

  if (phase === 'building_intent') {
    return <LoadingSpinner message="Interpretando suas respostas..." />
  }

  if (phase === 'intent_preview' && preRecommendation) {
    return (
      <IntentPreviewScreen
        intentSummary={preRecommendation.preview.intentSummary || preRecommendation.travelIntent.intent_summary}
        subtitle={PLANEJAR_COPY.intentPreviewSubtitle}
        isLoading={isLoading}
        onContinue={() => setPhase('destination_preference')}
      />
    )
  }

  if (phase === 'destination_preference') {
    return (
      <>
        {displayError && (
          <div className="shrink-0 p-4 text-center text-red-600 font-comfortaa text-sm">{displayError}</div>
        )}
        <DestinationPreferenceStep onComplete={handlePreferenceComplete} isLoading={isLoading} />
      </>
    )
  }

  if (phase === 'building_destinations') {
    return <LoadingSpinner message="Buscando destinos para vocês..." />
  }

  if (phase === 'destination_proposal' && destinationProposal) {
    return (
      <>
        {displayError && (
          <div className="shrink-0 p-4 text-center text-red-600 font-comfortaa text-sm">{displayError}</div>
        )}
        <DestinationProposalScreen
          proposal={destinationProposal}
          intentSummary={preRecommendation?.travelIntent.intent_summary}
          selectedUniqueName={selectedDestination}
          onSelect={setSelectedDestination}
          onContinue={handleCreateTrip}
          eyebrow={PLANEJAR_COPY.destinationProposalEyebrow}
          title={PLANEJAR_COPY.destinationProposalTitle}
        />
      </>
    )
  }

  if (phase === 'creating_trip') {
    return <LoadingSpinner message="Criando sua viagem..." />
  }

  return null
}
