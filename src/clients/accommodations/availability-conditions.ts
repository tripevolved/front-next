import type { AccommodationAvailabilityConditionsResponse } from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";
import { parseAccommodationApiDateTime } from "./availability";

export interface AccommodationAvailabilityConditionsRequest {
  uniqueTransactionId: string;
  vendor: string;
  roomRateIds: string[];
}

/**
 * POST /accommodations/{uniqueName}/availability/conditions
 */
type ConditionsApiJson = {
  uniqueTransactionId: string;
  uniqueTransactionValidUntil?: unknown;
  rates: AccommodationAvailabilityConditionsResponse["rates"];
};

export const postAccommodationAvailabilityConditions = async (
  accommodationUniqueName: string,
  body: AccommodationAvailabilityConditionsRequest
): Promise<AccommodationAvailabilityConditionsResponse> => {
  const route = `accommodations/${accommodationUniqueName}/availability/conditions`;
  const data = await ApiRequest.post<ConditionsApiJson>(route, body);
  return {
    uniqueTransactionId: data.uniqueTransactionId,
    rates: data.rates,
    uniqueTransactionValidUntil: parseAccommodationApiDateTime(data.uniqueTransactionValidUntil),
  };
};
