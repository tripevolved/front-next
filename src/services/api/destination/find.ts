import { PublicDestination } from "@/types";
import { ApiRequestService } from "../api-request.service";

export const getDestinationByName = async (destinationName: string): Promise<PublicDestination> => {
  const url = `destinations/${destinationName}/public`;
  return await ApiRequestService.get(url).then(({ data }) => data);
};
