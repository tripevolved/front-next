import { TravelerType } from '@/core/types/trip'
import type { QuizAnswers } from '@/components/quiz'
import { isCustomAnswer, isSingleSelectAnswer } from '@/components/quiz/answers'
import type { FamilyRoom, FamilyTravellers } from '@/components/trip-planning/familyTypes'

export const TRIP_PLANNING_QUESTION_IDS = {
  intro: 'intro',
  dates: 'dates',
  type: 'type',
  familyTravelers: 'familyTravelers',
  familyRooms: 'familyRooms',
  goals: 'goals',
  profile: 'profile',
  budget: 'budget',
  description: 'description',
  createTrip: 'createTrip',
} as const

export function getTravelerType(answers: QuizAnswers): TravelerType {
  const raw = answers[TRIP_PLANNING_QUESTION_IDS.type]
  if (isSingleSelectAnswer(raw) && raw.value) {
    return raw.value as TravelerType
  }
  return TravelerType.COUPLE
}

export function isFamilyTrip(answers: QuizAnswers): boolean {
  return getTravelerType(answers) === TravelerType.FAMILY
}

export function getFamilyTravellers(answers: QuizAnswers): FamilyTravellers {
  const raw = answers[TRIP_PLANNING_QUESTION_IDS.familyTravelers]
  if (isCustomAnswer(raw) && raw.value && typeof raw.value === 'object') {
    const v = raw.value as FamilyTravellers
    if (typeof v.adults === 'number') return v
  }
  return { adults: 2, children: 0, childrenAges: [] }
}

export function getFamilyRooms(answers: QuizAnswers): FamilyRoom[] | null {
  const raw = answers[TRIP_PLANNING_QUESTION_IDS.familyRooms]
  if (isCustomAnswer(raw) && Array.isArray(raw.value)) {
    return raw.value as FamilyRoom[]
  }
  return null
}
