import { ApiRequest } from '../common/request'
import { CreateTripRequest } from '@/core/types/trip'

export const createTrip = async (data: CreateTripRequest): Promise<{ id: string }> => {
  const response = await ApiRequest.post<{ id: string }>('/trips', data, {
    headers: {
      'traveler-id': data.travelerId
    }
  })
  
  return response
} 