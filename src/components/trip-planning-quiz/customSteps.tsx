'use client'

import { StepFamilyRoomsChoice, StepFamilyTravelersCount } from '@/components/trip-planning'
import type { FamilyRoom, FamilyTravellers } from '@/components/trip-planning/familyTypes'
import type { CustomQuestion } from '@/components/quiz'
import { isCustomAnswer } from '@/components/quiz/answers'
import { getFamilyTravellers, isFamilyTrip, TRIP_PLANNING_QUESTION_IDS } from './types'

export const familyTravelersQuestion: CustomQuestion = {
  id: TRIP_PLANNING_QUESTION_IDS.familyTravelers,
  type: 'custom',
  stepLabel: 'Viajantes',
  title: 'Quem vai na viagem?',
  visibleWhen: isFamilyTrip,
  validate: (value) => {
    if (!isCustomAnswer(value) || !value.value) {
      return 'Informe os viajantes para continuar.'
    }
    return null
  },
  render: ({ value, onChange, onNext, onBack }) => {
    const initial = isCustomAnswer(value) ? (value.value as FamilyTravellers) : undefined
    return (
      <StepFamilyTravelersCount
        initial={initial}
        onBack={onBack}
        onNext={(payload) => {
          onChange({ value: payload })
          onNext()
        }}
      />
    )
  },
}

export const familyRoomsQuestion: CustomQuestion = {
  id: TRIP_PLANNING_QUESTION_IDS.familyRooms,
  type: 'custom',
  stepLabel: 'Quartos',
  title: 'Como dividir os quartos?',
  visibleWhen: isFamilyTrip,
  validate: (value) => {
    if (!isCustomAnswer(value) || !Array.isArray(value.value) || value.value.length === 0) {
      return 'Defina a divisão dos quartos para continuar.'
    }
    return null
  },
  render: ({ value, onChange, answers, onNext, onBack }) => {
    const travelers = getFamilyTravellers(answers)
    const initial = isCustomAnswer(value) ? (value.value as FamilyRoom[]) : undefined
    return (
      <StepFamilyRoomsChoice
        travelers={travelers}
        initialRooms={initial}
        onBack={onBack}
        onNext={(rooms) => {
          onChange({ value: rooms })
          onNext()
        }}
      />
    )
  },
}
