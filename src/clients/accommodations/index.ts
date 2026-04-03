import { getAccommodationByUniqueName, getAccommodationByDestinationUniqueName } from "./public";
import {
  getAccommodationAvailability,
  type AccommodationAvailabilityQuery,
  type AccommodationAvailabilityRequestBody,
  type AvailabilityTravelerType,
  type TravelerInput,
} from "./availability";

export { toDateOnlyString } from "./availability";

export const AccommodationsApiService = {
  getAccommodationByUniqueName,
  getAccommodationByDestinationUniqueName,
  getAccommodationAvailability,
};

export type {
  AccommodationAvailabilityQuery,
  AccommodationAvailabilityRequestBody,
  AvailabilityTravelerType,
  TravelerInput,
};
export type { FamilyRoom } from "@/components/trip-planning/familyTypes";
