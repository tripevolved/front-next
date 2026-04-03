import type { FamilyRoom } from "@/components/trip-planning/familyTypes";
import { AccommodationAvailabilityResponse } from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";

/** Local calendar date as `YYYY-MM-DD` (no time / timezone offset in the string). */
export function toDateOnlyString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export type AvailabilityTravelerType = "COUPLE" | "FAMILY";

export interface TravelerInput {
  type: AvailabilityTravelerType;
  adults: number;
  children: number;
  childrenAges: number[];
  rooms: FamilyRoom[];
}

export interface AccommodationAvailabilityQuery {
  includesBreakfast: boolean;
  hasFreeCancellation: boolean;
  travelerInput: TravelerInput;
}

/**
 * Request body for POST accommodations/{uniqueName}/availability
 * `startDate` / `endDate` are date-only strings (`YYYY-MM-DD`).
 */
export interface AccommodationAvailabilityRequestBody extends AccommodationAvailabilityQuery {
  startDate: string;
  endDate: string;
}

/**
 * Fetch accommodation availability by unique name, date range, and filters (POST).
 */
export const getAccommodationAvailability = async (
  uniqueName: string,
  startDate: Date,
  endDate: Date,
  query: AccommodationAvailabilityQuery
): Promise<AccommodationAvailabilityResponse> => {
  const route = `accommodations/${uniqueName}/availability`;
  const body: AccommodationAvailabilityRequestBody = {
    startDate: toDateOnlyString(startDate),
    endDate: toDateOnlyString(endDate),
    includesBreakfast: query.includesBreakfast,
    hasFreeCancellation: query.hasFreeCancellation,
    travelerInput: query.travelerInput
  };
  return ApiRequest.post<AccommodationAvailabilityResponse>(route, body);
};
