import { ApiRequest } from "@/services/api/request";
import type { TravelIntent } from "@/core/types/travelIntent";

/**
 * POST /trips/{tripId}/travel-intent
 * Persists travel intent and ensures a destination anchor proposal exists.
 */
export const attachTripTravelIntent = async (
  tripId: string,
  travelIntent: TravelIntent,
): Promise<void> => {
  const route = `trips/${tripId}/travel-intent`;
  await ApiRequest.post(route, { travelIntent });
};
