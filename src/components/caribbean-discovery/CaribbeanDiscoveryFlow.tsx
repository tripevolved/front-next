'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuizFlow } from '@/components/quiz'
import type { QuizAnswers } from '@/components/quiz'
import { LocalStorageService } from '@/clients/local'
import { TripsApiService } from '@/clients/trips'
import {
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
import {
  CARIBE_DESTINATION_UNIQUE_NAME,
  CARIBE_PLANEJAR_FUNNEL,
  CARIBE_PLANEJAR_SOURCE,
} from './constants'

const CARIBBEAN_COPY = {
  intentPreviewSubtitle:
    'Na próxima etapa, vamos alinhar datas e orçamento para recomendações de hospedagem no Caribe.',
}

type Phase =
  | 'quiz_phase_1'
  | 'building_intent'
  | 'intent_preview'
  | 'quiz_phase_2'
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
  const { preRecommendation, error, setError, isLoading, buildTravelIntent } = useRecommendationFunnel()

  const handlePhase1Complete = useCallback(
    async (answers: QuizAnswers) => {
      setPhase1Answers(answers)
      setPhase('building_intent')
      const response = await buildTravelIntent({
        quizAnswers: answers,
        region: 'caribe',
        leadContext: { source: CARIBE_PLANEJAR_SOURCE },
      })
      if (response) {
        setPhase('intent_preview')
      } else {
        setPhase('quiz_phase_1')
      }
    },
    [buildTravelIntent],
  )

  const handlePhase2Complete = useCallback((answers: QuizAnswers) => {
    if (!preRecommendation?.travelIntent) return
    setPhase2Answers(answers)
    setPhase('lead')
  }, [preRecommendation])

  const handleCreateTrip = useCallback(async () => {
    if (!preRecommendation?.travelIntent || !phase1Answers || !phase2Answers) {
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
        optionalFreeText: extractOptionalFreeText(phase2Answers),
      })

      const { id } = await TripsApiService.createTrip(request)
      const returnTo = encodeURIComponent(`/app/viagens/${id}`)
      router.push(`/auth/login?returnTo=${returnTo}`)
    } catch {
      setError('Não foi possível criar sua viagem. Tente novamente.')
      setPhase('lead')
    }
  }, [phase1Answers, phase2Answers, preRecommendation, router, setError])

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

  if (phase === 'building_intent') {
    return (
      <FunnelScroll>
        <LoadingSpinner message="Interpretando o perfil de vocês..." />
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

  if (phase === 'lead' || phase === 'creating_trip') {
    return (
      <FunnelScroll>
        <LeadCaptureStep
          error={error}
          isCreating={phase === 'creating_trip'}
          funnelMetadata={[
            { key: 'source', value: CARIBE_PLANEJAR_SOURCE, keyDescription: 'Fonte RD Station' },
            { key: 'funnel', value: CARIBE_PLANEJAR_FUNNEL, keyDescription: 'Funil' },
            { key: 'destination', value: CARIBE_DESTINATION_UNIQUE_NAME, keyDescription: 'Destino' },
          ]}
          event="descobrir_viagem"
          eventOptions={{ source: 'Caribe Planejar — lead submit' }}
          onSuccess={handleCreateTrip}
        />
      </FunnelScroll>
    )
  }

  return null
}
