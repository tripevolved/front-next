import { ApiRequest } from "@/services/api/request";
import type { TravelerType } from "@/core/types/trip";

export type TripConfigurationUpdateRequest = {
  startDate?: string | null;
  endDate?: string | null;
  budget?: number;
  hasFlexibleBudget?: boolean;
  travelerType?: TravelerType | string;
};

export type TripConfigurationUpdateResponse = {
  startDate?: string | null;
  endDate?: string | null;
  budget?: number;
  hasFlexibleBudget?: boolean;
  travelerType?: string;
};

/**
 * PUT /trips/{tripId}/configuration
 */
export const putTripConfiguration = async (
  tripId: string,
  body: TripConfigurationUpdateRequest
): Promise<TripConfigurationUpdateResponse> => {
  const route = `trips/${tripId}/configuration`;
  return ApiRequest.put<TripConfigurationUpdateResponse>(route, body);
};
