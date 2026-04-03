import { getAccommodationByUniqueName, getAccommodationByDestinationUniqueName } from "./public";
import {
  getAccommodationAvailability,
  type AccommodationAvailabilityQuery,
  type AvailabilityTravelerType,
  type TravelerInput,
} from "./availability";

export const AccommodationsApiService = {
  getAccommodationByUniqueName,
  getAccommodationByDestinationUniqueName,
  getAccommodationAvailability,
};

export type {
  AccommodationAvailabilityQuery,
  AvailabilityTravelerType,
  TravelerInput,
};
