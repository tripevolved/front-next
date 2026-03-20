import { PublicAccommodation } from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";

/**
 * Get an accommodation by its unique name
 * @param uniqueName The unique name of the accommodation
 * @returns The accommodation data
 */
export const getAccommodationByUniqueName = async (
  uniqueName: string
): Promise<PublicAccommodation> => {
  const route = `accommodations/${uniqueName}`;
  return ApiRequest.get<PublicAccommodation>(route);
};

/**
 * Get an accommodation by destination unique name (e.g. from trip proposal).
 * @param destinationUniqueName The destination unique name
 * @returns The accommodation data (same model as getAccommodationByUniqueName)
 */
export const getAccommodationByDestinationUniqueName = async (
  destinationUniqueName: string
): Promise<PublicAccommodation> => {
  const route = `accommodations/${destinationUniqueName}/byDestination`;
  return ApiRequest.get<PublicAccommodation>(route);
};
