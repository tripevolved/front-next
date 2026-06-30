import { ApiRequest } from '@/services/api/request'
import type { TripAccommodationProposalsResponse } from '@/core/types/recommendations'

export async function getTripAccommodationProposals(tripId: string): Promise<TripAccommodationProposalsResponse> {
  return ApiRequest.get<TripAccommodationProposalsResponse>(`trips/${tripId}/accommodation-proposals`)
}

export async function recommendTripAccommodationProposals(tripId: string): Promise<TripAccommodationProposalsResponse> {
  return ApiRequest.post<TripAccommodationProposalsResponse>(`trips/${tripId}/accommodation-proposals/recommend`, {})
}
