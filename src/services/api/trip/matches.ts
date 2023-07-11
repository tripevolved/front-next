import { ApiRequest } from "@/services/api/request";
import { Photo } from "@/core/types";

export type MatchedDestination = {
  destinationId: string;
  matchScore: number;
  name: string;
  uniqueName: string;
  images: Photo[];
  details: string | null;
}

export type MatchedDestinationReturn = {
  tripId: string;
  mainChoice: MatchedDestination | null;
  otherChoices: MatchedDestination[];
};

export const putMatchedDestinations = async ({ tripId } : { tripId: string }): Promise<MatchedDestinationReturn> => {
  const url = "trips/matches/" + tripId;
  const match = await ApiRequest.put<MatchedDestinationReturn>(url, null);

  return match;
};
