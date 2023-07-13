import { ApiRequest } from "@/services/api/request";

export interface TripDestinationInput {
  destinationId: string;
}

export const putDestinationIdForTrip = async ({
  tripId,
  tripDestination,
}: {
  tripId: string;
  tripDestination: TripDestinationInput;
}): Promise<any> => {
  const url = "trips/" + tripId + "/destination";
  const ok = await ApiRequest.put(url, tripDestination);

  return ok;
};
