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
