import { getAccommodationByUniqueName, getAccommodationByDestinationUniqueName } from "./public";
import { getAccommodationAvailabilityByDestination } from "./by-destination-availability";
import {
  getAccommodationAvailability,
  type AccommodationAvailabilityQuery,
  type AccommodationAvailabilityRequestBody,
  type AvailabilityTravelerType,
  type TravelerInput,
} from "./availability";
import {
  postAccommodationAvailabilityConditions,
  type AccommodationAvailabilityConditionsRequest,
} from "./availability-conditions";

export { toDateOnlyString, parseAccommodationApiDateTime } from "./availability";

export const AccommodationsApiService = {
  getAccommodationByUniqueName,
  getAccommodationByDestinationUniqueName,
  getAccommodationAvailabilityByDestination,
  getAccommodationAvailability,
  postAccommodationAvailabilityConditions,
};

export type {
  AccommodationAvailabilityQuery,
  AccommodationAvailabilityRequestBody,
  AvailabilityTravelerType,
  TravelerInput,
};
export type { AccommodationAvailabilityConditionsRequest };
export type { FamilyRoom } from "@/components/trip-planning/familyTypes";
