import type { FamilyRoom } from "@/components/trip-planning/familyTypes";
import { AccommodationAvailabilityResponse } from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";

/**
 * Coerces a JSON datetime from the API (`string`, epoch `number`, etc.) into a `Date`, or `undefined` if missing/invalid.
 */
export function parseAccommodationApiDateTime(value: unknown): Date | undefined {
  if (value == null) return undefined;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }
  return undefined;
}

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
type AccommodationAvailabilityApiJson = {
  transactionId: string;
  uniqueTransactionValidUntil?: unknown;
  rooms: AccommodationAvailabilityResponse["rooms"];
};

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
    travelerInput: query.travelerInput,
  };
  const data = await ApiRequest.post<AccommodationAvailabilityApiJson>(route, body);
  return {
    transactionId: data.transactionId,
    rooms: data.rooms,
    uniqueTransactionValidUntil: parseAccommodationApiDateTime(data.uniqueTransactionValidUntil),
  };
};
