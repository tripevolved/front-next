import { TravelerType, type CreateTripRequest } from '@/core/types/trip'
import type { TravelIntent } from '@/core/types/travelIntent'
import type { DestinationProposalResponse } from '@/core/types/recommendations'
import type { QuizAnswers } from '@/components/quiz'
import {
  CARIBBEAN_BUDGET_TIERS,
  CARIBBEAN_PHASE1_IDS,
  CARIBBEAN_PHASE2_IDS,
  type CaribbeanBudgetTierId,
} from './questions'
import { isDateRangeAnswer, isSingleSelectAnswer } from '@/components/quiz/answers'
import { MAX_TRIP_DATE_RANGE_DAYS } from '@/components/DateRangePicker'
import { CARIBE_DESTINATION_UNIQUE_NAME, CARIBE_PLANEJAR_FUNNEL } from './constants'

const DEFAULT_MAX_BUDGET = CARIBBEAN_BUDGET_TIERS.premium

type BuildParams = {
  travelerId: string
  travelIntent: TravelIntent
  quizPhase1: QuizAnswers
  quizPhase2: QuizAnswers
  optionalFreeText?: string
}

function buildCaribeAnchorDestinationProposal(travelIntent: TravelIntent): DestinationProposalResponse {
  return {
    mainChoice: {
      destinationName: 'Caribe',
      destinationUniqueName: CARIBE_DESTINATION_UNIQUE_NAME,
      matchScore: 1,
      alignmentLabel: 'Destino escolhido',
      whyRecommended:
        travelIntent.intent_summary?.trim() ||
        'Viagem ao Caribe alinhada ao perfil e preferências de vocês.',
      alignedWithIntent: [],
      tradeoffs: [],
      bestFor: [],
    },
    otherChoices: [],
  }
}

export function buildCaribbeanDiscoveryTripRequest({
  travelerId,
  travelIntent,
  quizPhase1,
  quizPhase2,
  optionalFreeText,
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
  const maxDaysUnclamped = typeof maxDaysRaw === 'number' ? maxDaysRaw : travelIntent.trip_duration ?? 7
  const maxDays = Math.min(MAX_TRIP_DATE_RANGE_DAYS, Math.max(1, Math.floor(maxDaysUnclamped)))

  const budgetAnswer = quizPhase2[CARIBBEAN_PHASE2_IDS.budget]
  const budgetTierId = isSingleSelectAnswer(budgetAnswer) ? budgetAnswer.value : null
  const maxBudget =
    budgetTierId && budgetTierId in CARIBBEAN_BUDGET_TIERS
      ? CARIBBEAN_BUDGET_TIERS[budgetTierId as CaribbeanBudgetTierId]
      : DEFAULT_MAX_BUDGET
  const isFlexible = true

  const feelingAnswer = quizPhase1[CARIBBEAN_PHASE1_IDS.feelingAfterTrip]
  const travelerProfile = isSingleSelectAnswer(feelingAnswer) ? feelingAnswer.value : 'relax'

  const tripDescription = optionalFreeText
    ? `${travelIntent.intent_summary}\n\n${optionalFreeText}`.trim()
    : travelIntent.intent_summary

  const destinationProposal = buildCaribeAnchorDestinationProposal(travelIntent)

  return {
    travelerId,
    goals: [],
    tripDetails: {
      travelerProfile,
      tripDescription,
    },
    budget: {
      maxBudget,
      isFlexible,
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
    destination: CARIBE_DESTINATION_UNIQUE_NAME,
    travelIntent,
    metadata: {
      funnelVersion: CARIBE_PLANEJAR_FUNNEL,
      region: 'caribe',
      quizPhase1,
      quizPhase2,
      optionalFreeText: optionalFreeText ?? null,
    },
    destinationProposal,
    selectedDestinationUniqueName: CARIBE_DESTINATION_UNIQUE_NAME,
  }
}
