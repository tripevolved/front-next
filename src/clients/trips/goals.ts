import { ApiRequest } from '@/services/api/request'
import type { TravelerType } from '@/core/types/trip'

export interface TripGoal {
  name: string,
  uniqueName: string
}

export const getGoals = async (travelerType: TravelerType): Promise<TripGoal[]> => {
  const response = await ApiRequest.get<TripGoal[]>(`/trips/goals?travelerType=${travelerType}`)
  return response
}