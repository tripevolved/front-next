import type { QuizAnswers } from '@/components/quiz'
import {
  isCustomAnswer,
  isDateRangeAnswer,
  isMultiSelectAnswer,
  isRangeWithOptionsAnswer,
  isSingleSelectAnswer,
  isTextAnswer,
} from '@/components/quiz/answers'
import type { FamilyRoom, FamilyTravellers } from '@/components/trip-planning/familyTypes'
import type { TripDates, TripGoals, TripProfile, TripType } from '@/components/trip-planning/types'
import type { TripBudgetPayload } from '@/components/trip-planning/StepBudget'
import { TravelerType } from '@/core/types/trip'
import { getFamilyRooms, getFamilyTravellers, getTravelerType, TRIP_PLANNING_QUESTION_IDS } from './types'

export type TripPlanningState = {
  tripDates: TripDates | null
  tripGoals: TripGoals | null
  tripProfile: TripProfile | null
  tripType: TripType | null
  tripBudget: TripBudgetPayload | null
  tripDescription: string
  familyTravellers: FamilyTravellers | null
  familyRooms: FamilyRoom[] | null
}

export function mapAnswersToTripState(answers: QuizAnswers): TripPlanningState {
  const datesRaw = answers[TRIP_PLANNING_QUESTION_IDS.dates]
  let tripDates: TripDates | null = null
  if (isDateRangeAnswer(datesRaw)) {
    const maxDays =
      typeof datesRaw.extras?.maxDays === 'number'
        ? Math.max(1, Math.floor(datesRaw.extras.maxDays))
        : undefined
    tripDates = {
      startDate: datesRaw.startDate,
      endDate: datesRaw.endDate,
      month: null,
      maxDays,
    }
  }

  const type = getTravelerType(answers)
  const tripType: TripType = { type }

  const goalsRaw = answers[TRIP_PLANNING_QUESTION_IDS.goals]
  const tripGoals: TripGoals | null = isMultiSelectAnswer(goalsRaw)
    ? { goals: goalsRaw.values }
    : null

  const profileRaw = answers[TRIP_PLANNING_QUESTION_IDS.profile]
  const tripProfile: TripProfile | null = isSingleSelectAnswer(profileRaw)
    ? { profile: profileRaw.value }
    : null

  const budgetRaw = answers[TRIP_PLANNING_QUESTION_IDS.budget]
  let tripBudget: TripBudgetPayload | null = null
  if (isRangeWithOptionsAnswer(budgetRaw)) {
    tripBudget = {
      maxBudget: budgetRaw.value,
      isFlexible: budgetRaw.options.flexible ?? true,
    }
  }

  const descriptionRaw = answers[TRIP_PLANNING_QUESTION_IDS.description]
  const tripDescription = isTextAnswer(descriptionRaw) ? descriptionRaw.value.trim() : ''

  const isFamily = type === TravelerType.FAMILY
  const familyTravellers = isFamily ? getFamilyTravellers(answers) : null
  const familyRooms = isFamily ? getFamilyRooms(answers) : null

  return {
    tripDates,
    tripGoals,
    tripProfile,
    tripType,
    tripBudget,
    tripDescription,
    familyTravellers,
    familyRooms,
  }
}
