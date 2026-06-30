'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import LeadForm from '@/components/LeadForm'
import { QuizFlow } from '@/components/quiz'
import type { QuizAnswers } from '@/components/quiz'
import { LocalStorageService } from '@/clients/local'
import { RecommendationsApiService } from '@/clients/recommendations'
import { TripsApiService } from '@/clients/trips'
import type { PreRecommendationResponse } from '@/core/types/travelIntent'
import type { DestinationProposalResponse } from '@/core/types/recommendations'
import { IntentPreviewScreen } from './IntentPreviewScreen'
import { DestinationProposalScreen } from './DestinationProposalScreen'
import {
  buildCaribbeanPhase1QuizConfig,
  buildCaribbeanPhase2QuizConfig,
  extractOptionalFreeText,
} from './questions'
import { buildCaribbeanDiscoveryTripRequest } from './buildCaribbeanDiscoveryTripRequest'

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

function DrawerScroll({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col flex-1 min-h-0 overflow-hidden">{children}</div>
}

export function CaribbeanDiscoveryFlow({ onClose }: Props) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('quiz_phase_1')
  const [phase1Answers, setPhase1Answers] = useState<QuizAnswers | null>(null)
  const [phase2Answers, setPhase2Answers] = useState<QuizAnswers | null>(null)
  const [preRecommendation, setPreRecommendation] = useState<PreRecommendationResponse | null>(null)
  const [destinationProposal, setDestinationProposal] = useState<DestinationProposalResponse | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePhase1Complete = useCallback(async (answers: QuizAnswers) => {
    setPhase1Answers(answers)
    setIsLoading(true)
    setError(null)
    try {
      const response = await RecommendationsApiService.postPreRecommendation({
        quizAnswers: answers,
        optionalFreeText: extractOptionalFreeText(),
        region: 'caribe',
        leadContext: { source: 'consultoria-caribe' },
      })
      setPreRecommendation(response)
      setPhase('intent_preview')
    } catch {
      setError('Não foi possível interpretar suas respostas. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handlePhase2Complete = useCallback(
    async (answers: QuizAnswers) => {
      if (!preRecommendation?.travelIntent) return
      setPhase2Answers(answers)
      setIsLoading(true)
      setError(null)
      try {
        const mergedAnswers = { ...(phase1Answers ?? {}), ...answers }
        const response = await RecommendationsApiService.postDestinationRecommendation({
          travelIntent: preRecommendation.travelIntent,
          quizAnswers: mergedAnswers,
          optionalFreeText: extractOptionalFreeText(),
          region: 'caribe',
        })
        setDestinationProposal(response)
        setSelectedDestination(response.mainChoice?.destinationUniqueName ?? null)
        setPhase('destination_proposal')
      } catch {
        setError('Não foi possível gerar recomendações de destino. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [phase1Answers, preRecommendation],
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
  }, [destinationProposal, phase1Answers, phase2Answers, preRecommendation, router, selectedDestination])

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
      <DrawerScroll>
        {error && <div className="shrink-0 p-4 text-center text-red-600 font-comfortaa text-sm">{error}</div>}
        <QuizFlow config={phase1Config} embedded />
      </DrawerScroll>
    )
  }

  if (phase === 'intent_preview' && preRecommendation) {
    return (
      <DrawerScroll>
        <IntentPreviewScreen
          compact
          intentSummary={preRecommendation.preview.intentSummary || preRecommendation.travelIntent.intent_summary}
          isLoading={isLoading}
          onContinue={() => setPhase('quiz_phase_2')}
        />
      </DrawerScroll>
    )
  }

  if (phase === 'quiz_phase_2') {
    return (
      <DrawerScroll>
        {error && <div className="shrink-0 p-4 text-center text-red-600 font-comfortaa text-sm">{error}</div>}
        {isLoading ? (
          <div className="flex flex-1 justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500" />
          </div>
        ) : (
          <QuizFlow config={phase2Config} embedded />
        )}
      </DrawerScroll>
    )
  }

  if (phase === 'destination_proposal' && destinationProposal) {
    return (
      <DrawerScroll>
        <DestinationProposalScreen
          compact
          proposal={destinationProposal}
          intentSummary={preRecommendation?.travelIntent.intent_summary}
          selectedUniqueName={selectedDestination}
          onSelect={setSelectedDestination}
          onContinue={() => setPhase('lead')}
        />
      </DrawerScroll>
    )
  }

  if (phase === 'lead' || phase === 'creating_trip') {
    return (
      <DrawerScroll>
        <div className="flex flex-col flex-1 min-h-0 bg-white">
          <div className="shrink-0 border-b border-secondary-200 p-5 text-center">
            <p className="font-comfortaa text-xs text-secondary-500">Quase lá</p>
            <h1 className="font-baloo text-xl font-bold text-secondary-900 mt-1">Salve sua jornada</h1>
            <p className="font-comfortaa text-sm text-gray-600 mt-2 max-w-md mx-auto">
              Deixe seus dados para criar sua viagem e acessar as recomendações de hospedagem na plataforma.
            </p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto p-6 max-w-lg mx-auto w-full">
            {phase === 'creating_trip' ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500" />
                <p className="font-comfortaa text-secondary-600">Criando sua viagem...</p>
              </div>
            ) : (
              <>
                {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}
                <LeadForm
                  submitButtonText="Criar minha viagem"
                  additionalMetadata={[
                    { key: 'funnel', value: 'caribbean-discovery-v1', keyDescription: 'Funil' },
                    { key: 'destination', value: selectedDestination ?? '', keyDescription: 'Destino escolhido' },
                  ]}
                  onSuccess={handleCreateTrip}
                />
              </>
            )}
          </div>
        </div>
      </DrawerScroll>
    )
  }

  return null
}
