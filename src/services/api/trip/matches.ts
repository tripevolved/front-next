import { ApiRequest } from "@/services/api/request";
import { Photo } from "@/core/types";

export type MatchedDestination = {
  destinationId: string;
  matchScore: number;
  name: string;
  travelers: number | null;
  uniqueName: string;
  images: Photo[];
  details: string | null;
};

export type MatchedDestinationReturn = {
  tripId: string;
  mainChoice: MatchedDestination | null;
  otherChoices: MatchedDestination[];
};

export type FormData = {
  travelerProfile: string;
  objectiveId: string;
  days: string;
  budget: string;
};

export const putMatchedDestinations = async ({ tripId }: { tripId: string }): Promise<any> => {
  const url = "trips/matches/" + tripId;
  const ok = await ApiRequest.put(url, null);
  return ok;
};

export const getMatchedDestinations = async ({
  tripId,
  attempts = 3,
}: {
  tripId: string;
  attempts?: number;
}): Promise<MatchedDestinationReturn> => {
  const url = "trips/matches/" + tripId;
  const match = await ApiRequest.get<MatchedDestinationReturn>(url);

  if (attempts > 0 && !match?.mainChoice) {
    const ok = await putMatchedDestinations({ tripId });
    return await getMatchedDestinations({ tripId, attempts: attempts - 1 });
  }

  return match;
};

export const getMatches = async <T>({
  travelerProfile,
  objectiveId,
  days,
  budget,
}: FormData): Promise<T> => {
  const url = `/trips/matches?travelerProfile=${encodeURIComponent(
    travelerProfile
  )}&objectiveId=${encodeURIComponent(objectiveId)}&days=${encodeURIComponent(
    days.toString()
  )}&budget=${encodeURIComponent(budget.toString())}`;
  const response = await ApiRequest.get<T>(url);
  return response;
};
