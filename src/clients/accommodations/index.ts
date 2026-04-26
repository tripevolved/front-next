import { getAccommodationByUniqueName, getAccommodationByDestinationUniqueName } from "./public";
import { getAccommodationAvailabilityByDestination } from "./by-destination-availability";
import { getAccommodationsByCollection } from "./by-collection";
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
import { postAccommodationAvailabilityByCollection } from "./by-collection-availability";

export { toDateOnlyString, parseAccommodationApiDateTime } from "./availability";

export const AccommodationsApiService = {
  getAccommodationByUniqueName,
  getAccommodationByDestinationUniqueName,
  getAccommodationAvailabilityByDestination,
  getAccommodationsByCollection,
  getAccommodationAvailability,
  postAccommodationAvailabilityByCollection,
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
export type { AccommodationByCollectionItem, AccommodationsByCollectionResponse } from "./by-collection";
