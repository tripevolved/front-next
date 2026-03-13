import { AccommodationAvailabilityResponse } from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";

/**
 * Get accommodation availability by unique name and date range
 * @param uniqueName The unique name of the accommodation
 * @param startDate The check-in date
 * @param endDate The check-out date
 * @returns The availability data with rooms and pricing
 */
export const getAccommodationAvailability = async (
  uniqueName: string,
  startDate: Date,
  endDate: Date
): Promise<AccommodationAvailabilityResponse> => {
  const route = `accommodations/${uniqueName}/availability?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
  return ApiRequest.get<AccommodationAvailabilityResponse>(route);
};
