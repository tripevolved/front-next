import { ApiRequest } from '@/services/api/request'
import { CreateTripRequest } from '@/core/types/trip'

export const createTrip = async (data: CreateTripRequest): Promise<{ id: string }> => {
  const response = await ApiRequest.post<{ id: string }>('/trips', data, {
    headers: {
      'traveler-id': data.travelerId
    }
  })
  
  return response
}

export const createEmptyTrip = async (travelerId: string): Promise<{ id: string }> => {
  const response = await ApiRequest.post<{ id: string }>('/trips', {
    travelerId,
    mode: 'CONSULTANCY'
  }, {
    headers: {
      'traveler-id': travelerId
    }
  })
  
  return response
} 