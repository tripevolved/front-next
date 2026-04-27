import { ApiRequest } from "@/services/api/request";
import type { AccommodationAvailabilityRequestBody } from "./availability";
import { toDateOnlyString, type AccommodationAvailabilityQuery } from "./availability";
import type { AccommodationByDestinationAvailabilityResponse } from "./by-destination-availability";

/** Same body as by-destination availability, plus accommodation unique names to quote. */
export type AccommodationAvailabilityByUniqueNamesBody = AccommodationAvailabilityRequestBody & {
  accommodations: string[];
};

/**
 * POST `accommodations/availability` — batch quote (dates, travelerInput, plus `accommodations` unique names).
 * Single accommodation: `getAccommodationAvailability` → POST `accommodations/{uniqueName}/availability` in `availability.ts`.
 */
export const postAccommodationAvailabilityByUniqueNames = async (
  startDate: Date,
  endDate: Date,
  query: AccommodationAvailabilityQuery,
  accommodationUniqueNames: string[]
): Promise<AccommodationByDestinationAvailabilityResponse> => {
  const route = "accommodations/availability";
  const body: AccommodationAvailabilityByUniqueNamesBody = {
    startDate: toDateOnlyString(startDate),
    endDate: toDateOnlyString(endDate),
    travelerInput: query.travelerInput,
    accommodations: accommodationUniqueNames,
  };
  return ApiRequest.post<AccommodationByDestinationAvailabilityResponse>(route, body);
};
