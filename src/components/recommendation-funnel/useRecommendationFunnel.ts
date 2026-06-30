'use client'

import { useCallback, useState } from 'react'
import { RecommendationsApiService } from '@/clients/recommendations'
import type { PreRecommendationResponse, TravelIntent } from '@/core/types/travelIntent'
import type { DestinationProposalResponse } from '@/core/types/recommendations'
import type { QuizAnswers } from '@/components/quiz'
import type { FunnelLeadContext } from './types'

type BuildPreInput = {
  quizAnswers: QuizAnswers
  optionalFreeText?: string
  region?: string | null
  leadContext?: FunnelLeadContext
}

type BuildDestinationsInput = {
  travelIntent: TravelIntent
  quizAnswers: QuizAnswers
  optionalFreeText?: string
  region?: string | null
}

export function useRecommendationFunnel() {
  const [preRecommendation, setPreRecommendation] = useState<PreRecommendationResponse | null>(null)
  const [destinationProposal, setDestinationProposal] = useState<DestinationProposalResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const buildTravelIntent = useCallback(async (input: BuildPreInput) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await RecommendationsApiService.postPreRecommendation({
        quizAnswers: input.quizAnswers,
        optionalFreeText: input.optionalFreeText,
        region: input.region,
        leadContext: input.leadContext,
      })
      setPreRecommendation(response)
      return response
    } catch {
      setError('Não foi possível interpretar suas respostas. Tente novamente.')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const buildDestinationRecommendations = useCallback(async (input: BuildDestinationsInput) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await RecommendationsApiService.postDestinationRecommendation({
        travelIntent: input.travelIntent,
        quizAnswers: input.quizAnswers,
        optionalFreeText: input.optionalFreeText,
        region: input.region,
      })
      setDestinationProposal(response)
      return response
    } catch {
      setError('Não foi possível gerar recomendações de destino. Tente novamente.')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {
    preRecommendation,
    destinationProposal,
    setDestinationProposal,
    error,
    setError,
    clearError,
    isLoading,
    buildTravelIntent,
    buildDestinationRecommendations,
  }
}
