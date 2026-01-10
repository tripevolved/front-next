import { StayAvailabilityResponse } from "@/core/types/stay";
import { ApiRequest } from "@/services/api/request";

/**
 * Get stay availability by unique name and date range
 * @param uniqueName The unique name of the stay
 * @param startDate The check-in date
 * @param endDate The check-out date
 * @returns The availability data with rooms and pricing
 */
export const getStayAvailability = async (
  uniqueName: string,
  startDate: Date,
  endDate: Date
): Promise<StayAvailabilityResponse> => {
  const route = `stays/${uniqueName}/availability?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
  return ApiRequest.get<StayAvailabilityResponse>(route);
};

