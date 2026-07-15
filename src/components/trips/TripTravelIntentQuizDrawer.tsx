'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { QuizFlow } from '@/components/quiz'
import type { QuizAnswers } from '@/components/quiz'
import { TripsApiService } from '@/clients/trips'
import {
  IntentPreviewScreen,
  LoadingSpinner,
  useRecommendationFunnel,
} from '@/components/recommendation-funnel'
import { buildTripTravelIntentQuizConfig } from '@/components/trip-planning-quiz/questions'
import { extractPlanejarOptionalFreeText } from '@/components/trip-planning-quiz/extractOptionalFreeText'
import { TravelerType } from '@/core/types/trip'
import type { TripAccommodationProposalsResponse } from '@/core/types/recommendations'

type Phase = 'quiz' | 'building_intent' | 'intent_preview' | 'attaching' | 'error'

type Props = {
  isOpen: boolean
  onClose: () => void
  tripId: string
  travelerType?: TravelerType | string | null
  onCompleted: (proposals: TripAccommodationProposalsResponse) => void | Promise<void>
}

export function TripTravelIntentQuizDrawer({
  isOpen,
  onClose,
  tripId,
  travelerType,
  onCompleted,
}: Props) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<Phase>('quiz')
  const [flowError, setFlowError] = useState<string | null>(null)

  const { preRecommendation, error, isLoading, buildTravelIntent, clearError } =
    useRecommendationFunnel()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!isOpen) {
      setPhase('quiz')
      setFlowError(null)
      clearError()
    }
  }, [isOpen, clearError])

  const resolvedTravelerType =
    travelerType && Object.values(TravelerType).includes(travelerType as TravelerType)
      ? (travelerType as TravelerType)
      : TravelerType.COUPLE

  const handleQuizComplete = useCallback(
    async (answers: QuizAnswers) => {
      setPhase('building_intent')
      setFlowError(null)
      const response = await buildTravelIntent({
        quizAnswers: answers,
        optionalFreeText: extractPlanejarOptionalFreeText(answers),
        leadContext: { source: 'trip-recommendations' },
      })
      if (response) {
        setPhase('intent_preview')
      } else {
        setPhase('quiz')
      }
    },
    [buildTravelIntent],
  )

  const quizConfig = useMemo(
    () =>
      buildTripTravelIntentQuizConfig({
        travelerType: resolvedTravelerType,
        onQuizComplete: handleQuizComplete,
        onExit: onClose,
      }),
    [resolvedTravelerType, handleQuizComplete, onClose],
  )

  const handleContinueFromPreview = useCallback(async () => {
    if (!preRecommendation?.travelIntent) return
    setPhase('attaching')
    setFlowError(null)
    try {
      await TripsApiService.attachTripTravelIntent(tripId, preRecommendation.travelIntent)
      const proposals = await TripsApiService.recommendTripAccommodationProposals(tripId)
      await onCompleted(proposals)
      onClose()
    } catch {
      setFlowError('Não foi possível gerar as recomendações. Tente novamente.')
      setPhase('error')
    }
  }, [preRecommendation, tripId, onCompleted, onClose])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3 lg:w-1/2">
        <header className="shrink-0 border-b border-secondary-200 p-5">
          <div className="grid grid-cols-[1fr,auto] items-center gap-4">
            <div className="min-w-0">
              <p className="font-comfortaa text-xs text-secondary-500">Sua viagem</p>
              <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">
                Personalizar recomendações
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 transition-colors inline-flex items-center justify-center shrink-0"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
          {phase === 'quiz' ? <QuizFlow config={quizConfig} embedded /> : null}

          {phase === 'building_intent' || phase === 'attaching' ? (
            <LoadingSpinner
              message={
                phase === 'building_intent'
                  ? 'Interpretando suas respostas...'
                  : 'Gerando recomendações de hospedagem...'
              }
            />
          ) : null}

          {phase === 'intent_preview' && preRecommendation ? (
            <IntentPreviewScreen
              compact
              intentSummary={
                preRecommendation.preview.intentSummary ||
                preRecommendation.travelIntent.intent_summary
              }
              subtitle="Na próxima etapa, vamos recomendar hospedagens alinhadas ao seu perfil."
              isLoading={isLoading}
              onContinue={handleContinueFromPreview}
            />
          ) : null}

          {phase === 'error' || (phase === 'quiz' && (error || flowError)) ? (
            <div className="p-6 space-y-4">
              {(flowError || error) && (
                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm font-comfortaa">
                  {flowError || error}
                </div>
              )}
              {phase === 'error' ? (
                <button
                  type="button"
                  onClick={() => {
                    setFlowError(null)
                    setPhase(preRecommendation ? 'intent_preview' : 'quiz')
                  }}
                  className="w-full rounded-full bg-accent-500 px-4 py-2.5 font-baloo text-sm font-semibold text-secondary-900 hover:bg-accent-600"
                >
                  Tentar novamente
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </aside>
    </div>,
    document.body,
  )
}
