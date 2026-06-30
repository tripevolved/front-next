import type { CreateTripRequest } from '@/core/types/trip'
import type { TravelIntent } from '@/core/types/travelIntent'
import type { DestinationProposalResponse } from '@/core/types/recommendations'
import type { QuizAnswers } from '@/components/quiz'
import { buildCreateTripRequest } from '@/components/trip-planning'
import { mapAnswersToTripState } from './mapAnswersToTripState'

type BuildParams = {
  travelerId: string
  quizAnswers: QuizAnswers
  destinationPreference?: QuizAnswers
  travelIntent: TravelIntent
  destinationProposal: DestinationProposalResponse
  selectedDestinationUniqueName: string
}

export function buildAppPlanejarTripRequest({
  travelerId,
  quizAnswers,
  destinationPreference,
  travelIntent,
  destinationProposal,
  selectedDestinationUniqueName,
}: BuildParams): CreateTripRequest {
  const state = mapAnswersToTripState(quizAnswers)
  const tripDescription = travelIntent.intent_summary?.trim() || state.tripDescription

  const base = buildCreateTripRequest({
    travelerId,
    ...state,
    tripDescription,
  })

  return {
    ...base,
    shouldRecommendDestinations: false,
    mode: 'PROPOSAL',
    destination: selectedDestinationUniqueName,
    travelIntent,
    destinationProposal,
    selectedDestinationUniqueName,
    metadata: {
      funnelVersion: 'app-planejar-v1',
      quizAnswers,
      destinationPreference,
    },
  }
}
