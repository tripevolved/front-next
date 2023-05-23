import { PublicDestination } from "@/core/types";
import { ApiRequestService } from "../api-request.service";

export const getDestinationByName = async (destinationName: string): Promise<PublicDestination> => {
  const url = `destinations/${destinationName}/public`;
  const destination = await ApiRequestService.get(url).then(({ data }) => data);
  return destination;
};
