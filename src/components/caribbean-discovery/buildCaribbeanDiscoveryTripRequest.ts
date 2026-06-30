import { TravelerType, type CreateTripRequest } from '@/core/types/trip'
import type { TravelIntent } from '@/core/types/travelIntent'
import type { DestinationProposalResponse } from '@/core/types/recommendations'
import type { QuizAnswers } from '@/components/quiz'
import { CARIBBEAN_PHASE1_IDS, CARIBBEAN_PHASE2_IDS } from './questions'
import { isSingleSelectAnswer, isDateRangeAnswer } from '@/components/quiz/answers'

type BuildParams = {
  travelerId: string
  travelIntent: TravelIntent
  quizPhase1: QuizAnswers
  quizPhase2: QuizAnswers
  destinationProposal: DestinationProposalResponse
  selectedDestinationUniqueName: string
}

export function buildCaribbeanDiscoveryTripRequest({
  travelerId,
  travelIntent,
  quizPhase1,
  quizPhase2,
  destinationProposal,
  selectedDestinationUniqueName,
}: BuildParams): CreateTripRequest & {
  travelIntent: TravelIntent
  metadata: Record<string, unknown>
  destinationProposal: DestinationProposalResponse
  selectedDestinationUniqueName: string
} {
  const datesAnswer = quizPhase2[CARIBBEAN_PHASE2_IDS.dates]
  const dateRange = isDateRangeAnswer(datesAnswer) ? datesAnswer : null

  const startDate = dateRange?.startDate ?? null
  const endDate = dateRange?.endDate ?? null
  const maxDaysRaw = dateRange?.extras?.maxDays
  const maxDays = typeof maxDaysRaw === 'number' ? maxDaysRaw : travelIntent.trip_duration ?? 7

  const feelingAnswer = quizPhase1[CARIBBEAN_PHASE1_IDS.feelingAfterTrip]
  const travelerProfile = isSingleSelectAnswer(feelingAnswer) ? feelingAnswer.value : 'relax'

  return {
    travelerId,
    goals: [],
    tripDetails: {
      travelerProfile,
      tripDescription: travelIntent.intent_summary,
    },
    budget: {
      maxBudget: 35000,
      isFlexible: true,
    },
    dates: {
      startDate,
      endDate,
      month: null,
      anyMonthFlexibility: !startDate,
      minDays: maxDays,
      maxDays,
    },
    travelers: {
      type: TravelerType.COUPLE,
      adults: 2,
    },
    shouldRecommendDestinations: false,
    mode: 'PROPOSAL',
    destination: selectedDestinationUniqueName,
    travelIntent,
    metadata: {
      funnelVersion: 'caribbean-discovery-v1',
      region: 'caribe',
      quizPhase1,
      quizPhase2,
    },
    destinationProposal,
    selectedDestinationUniqueName,
  }
}
