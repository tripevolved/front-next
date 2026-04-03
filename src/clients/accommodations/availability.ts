import { AccommodationAvailabilityResponse } from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";

export type AvailabilityTravelerType = "COUPLE" | "FAMILY";

/** Serialized as JSON in the `travelerInput` query parameter */
export interface TravelerInput {
  type: AvailabilityTravelerType;
  adults: number;
  children: number;
  childrenAges: number[];
  rooms: number;
}

export interface AccommodationAvailabilityQuery {
  includesBreakfast: boolean;
  hasFreeCancellation: boolean;
  travelerInput: TravelerInput;
}

function buildAvailabilitySearchParams(
  startDate: Date,
  endDate: Date,
  query: AccommodationAvailabilityQuery
): string {
  const params = new URLSearchParams();
  params.set("startDate", startDate.toISOString());
  params.set("endDate", endDate.toISOString());
  params.set("includesBreakfast", String(query.includesBreakfast));
  params.set("hasFreeCancellation", String(query.hasFreeCancellation));
  params.set("travelerInput", JSON.stringify(query.travelerInput));
  return params.toString();
}

/**
 * Get accommodation availability by unique name, date range, and filters.
 */
export const getAccommodationAvailability = async (
  uniqueName: string,
  startDate: Date,
  endDate: Date,
  query: AccommodationAvailabilityQuery
): Promise<AccommodationAvailabilityResponse> => {
  const qs = buildAvailabilitySearchParams(startDate, endDate, query);
  const route = `accommodations/${uniqueName}/availability?${qs}`;
  return ApiRequest.get<AccommodationAvailabilityResponse>(route);
};
