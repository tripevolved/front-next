import { TripScript } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripScriptPreview = async (tripId: string) => {
  const route = `scripts/preview/${tripId}`;
  const tripScript = await ApiRequest.get<TripScript>(route);
  return tripScript;
};
