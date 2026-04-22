import type {
  PublicAccommodationAmenity,
  PublicAccommodationRoomAvailability,
} from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";
import type { AccommodationAvailabilityRequestBody } from "./availability";
import { toDateOnlyString, type AccommodationAvailabilityQuery } from "./availability";

export type AccommodationByDestinationAvailabilityItem = {
  id: string;
  uniqueName: string;
  title: string;
  coverImage?: { url: string; shortDescription?: string } | null;
  amenities: PublicAccommodationAmenity[];
  recommendedFor: string[];
  tags: string[];
  rooms: PublicAccommodationRoomAvailability[];
};

export type AccommodationByDestinationAvailabilityResponse = {
  transactionId: string;
  validUntil?: unknown;
  accommodations: AccommodationByDestinationAvailabilityItem[];
};

export const getAccommodationAvailabilityByDestination = async (
  destinationUniqueName: string,
  startDate: Date,
  endDate: Date,
  query: AccommodationAvailabilityQuery
): Promise<AccommodationByDestinationAvailabilityResponse> => {
  const route = `accommodations/${encodeURIComponent(destinationUniqueName)}/by-destination/availability`;
  const body: AccommodationAvailabilityRequestBody = {
    startDate: toDateOnlyString(startDate),
    endDate: toDateOnlyString(endDate),
    travelerInput: query.travelerInput,
  };
  return ApiRequest.post<AccommodationByDestinationAvailabilityResponse>(route, body);
};

