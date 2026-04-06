import type { AccommodationAvailabilityConditionsResponse } from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";

export interface AccommodationAvailabilityConditionsRequest {
  uniqueTransactionId: string;
  vendor: string;
  roomRateIds: string[];
}

/**
 * POST /accommodations/{uniqueName}/availability/conditions
 */
export const postAccommodationAvailabilityConditions = async (
  accommodationUniqueName: string,
  body: AccommodationAvailabilityConditionsRequest
): Promise<AccommodationAvailabilityConditionsResponse> => {
  const route = `accommodations/${accommodationUniqueName}/availability/conditions`;
  return ApiRequest.post<AccommodationAvailabilityConditionsResponse>(route, body);
};
