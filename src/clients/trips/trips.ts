import { TripProposal } from "@/core/types/trip";
import { ApiRequest } from "@/services/api/request";
import { LocalStorageService } from "@/clients/local";

/**
 * Get trip matches by trip ID
 * @param tripId The ID of the trip
 * @param travelerId Optional traveler ID. If not passed, uses LocalStorageService.getTraveler()
 * @returns The trip proposal data
 */
export const getTripMatches = async (
  tripId: string,
  travelerId?: string
): Promise<TripProposal> => {
  const route = `trips/matches/${tripId}`;

  const id =
    travelerId ?? LocalStorageService.getTraveler()?.id;
  const headers = id ? { "traveler-id": id } : undefined;

  return ApiRequest.get<TripProposal>(route, { headers });
}; 