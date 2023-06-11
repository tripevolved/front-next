import { PublicDestination } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getDestinationByName = async (destinationName: string) => {
  const route = `destinations/${destinationName}/public`;
  return await ApiRequest.get<PublicDestination>(route)
};
