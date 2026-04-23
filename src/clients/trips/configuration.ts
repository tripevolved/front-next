import { ApiRequest } from "@/services/api/request";

export type TripConfigurationUpdateRequest = {
  startDate: string;
  endDate: string;
};

export type TripConfigurationUpdateResponse = {
  startDate?: string | null;
  endDate?: string | null;
};

/**
 * PUT /trips/{tripId}/configuration
 * Updates the trip date configuration.
 */
export const putTripConfiguration = async (
  tripId: string,
  body: TripConfigurationUpdateRequest
): Promise<TripConfigurationUpdateResponse> => {
  const route = `trips/${tripId}/configuration`;
  return ApiRequest.put<TripConfigurationUpdateResponse>(route, body);
};

