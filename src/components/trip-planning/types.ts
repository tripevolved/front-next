import { TravelerType } from '@/core/types/trip'

export interface TripDates {
  startDate: string | null
  endDate: string | null
  /**
   * Janela em que a pessoa consegue viajar (range).
   * A duração desejada da viagem é informada via maxDays.
   */
  month: number | null
  maxDays?: number
}

export interface TripGoals {
  goals: string[]
}

export interface TripProfile {
  profile: string
}

export interface TripType {
  type: TravelerType
}

export interface StepTypeOption {
  id: TravelerType
  name: string
  icon: string
  available: boolean
}

