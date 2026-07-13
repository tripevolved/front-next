import { getAccommodationByUniqueName, getAccommodationByDestinationUniqueName } from "./public";
import { getAccommodationExtended } from "./extended";
import { getAccommodationCuratorship } from "./curatorship";
import { getAccommodationAvailabilityByDestination } from "./by-destination-availability";
import { getAccommodationsByCollection } from "./by-collection";
import { getAccommodationsByDestinationAll } from "./by-destination-all";
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
import { postAccommodationAvailabilityByUniqueNames } from "./by-accommodations-availability";

export { toDateOnlyString, parseAccommodationApiDateTime } from "./availability";

export const AccommodationsApiService = {
  getAccommodationByUniqueName,
  getAccommodationByDestinationUniqueName,
  getAccommodationExtended,
  getAccommodationCuratorship,
  getAccommodationAvailabilityByDestination,
  getAccommodationsByCollection,
  getAccommodationsByDestinationAll,
  getAccommodationAvailability,
  postAccommodationAvailabilityByUniqueNames,
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
export type { AccommodationCuratorship } from "./curatorship";
