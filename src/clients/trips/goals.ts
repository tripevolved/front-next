import { ApiRequest } from '@/services/api/request'

export interface TripGoal {
  name: string,
  uniqueName: string
}

export const getGoals = async (tripType: string): Promise<TripGoal[]> => {
  const response = await ApiRequest.get<TripGoal[]>(`/trips/goals?travelerType=${tripType}`)
  return response
}