import { ApiRequest } from '../common/request'

export const getGoals = async (): Promise<string[]> => {
  const response = await ApiRequest.get<string[]>('/trips/goals')
  return response
} 