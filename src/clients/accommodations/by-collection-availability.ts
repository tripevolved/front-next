import { ApiRequest } from "@/services/api/request";
import type { AccommodationAvailabilityRequestBody } from "./availability";
import { toDateOnlyString, type AccommodationAvailabilityQuery } from "./availability";
import type { AccommodationByDestinationAvailabilityResponse } from "./by-destination-availability";

export const postAccommodationAvailabilityByCollection = async (
  collectionUniqueName: string,
  startDate: Date,
  endDate: Date,
  query: AccommodationAvailabilityQuery
): Promise<AccommodationByDestinationAvailabilityResponse> => {
  const route = `accommodations/${encodeURIComponent(collectionUniqueName)}/by-collection/availability`;
  const body: AccommodationAvailabilityRequestBody = {
    startDate: toDateOnlyString(startDate),
    endDate: toDateOnlyString(endDate),
    travelerInput: query.travelerInput,
  };
  return ApiRequest.post<AccommodationByDestinationAvailabilityResponse>(route, body);
};

