import { TravelerType } from '@/core/types/trip'

export interface TripDates {
  startDate: string | null
  endDate: string | null
  month: number | null
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

