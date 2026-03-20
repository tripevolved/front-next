import { getAccommodationByUniqueName, getAccommodationByDestinationUniqueName } from "./public";
import { getAccommodationAvailability } from "./availability";

export const AccommodationsApiService = {
  getAccommodationByUniqueName,
  getAccommodationByDestinationUniqueName,
  getAccommodationAvailability,
};
