import { PublicDestination } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getDestinationByName = async (destinationName: string) => {
  const route = `destinations/${destinationName}/public`;
  const destination = await ApiRequest.get<PublicDestination>(route);
  destination.uniqueName = destinationName;
  return destination;
};
