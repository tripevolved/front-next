import { TripScript } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripScript = async (tripId: string) => {
  const route = `scripts/full/${tripId}`;
  const tripScript = await ApiRequest.get<TripScript>(route);
  return tripScript;
};
