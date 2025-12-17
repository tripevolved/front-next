import { TripProposal } from "@/core/types/trip";
import { ApiRequest } from "@/services/api/request";
import { LocalStorageService } from "@/clients/local";

/**
 * Get trip matches by trip ID
 * @param tripId The ID of the trip
 * @returns The trip proposal data
 */
export const getTripMatches = async (tripId: string): Promise<TripProposal> => {
  const route = `trips/matches/${tripId}`;
  
  // Get traveler ID from local storage
  const traveler = LocalStorageService.getTraveler();
  const headers = traveler ? { 'traveler-id': traveler.id } : undefined;
  
  return ApiRequest.get<TripProposal>(route, { headers });
}; 