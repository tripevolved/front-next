import { PublicDestination } from "@/core/types/destination";
import { ApiRequest } from "@/services/api/request";

/**
 * Get a destination by its unique name
 * @param uniqueName The unique name of the destination
 * @returns The destination data
 */
export const getDestinationByUniqueName = async (uniqueName: string): Promise<PublicDestination> => {
  const route = `destinations/${uniqueName}/public`;
  return ApiRequest.get<PublicDestination>(route);
}; 