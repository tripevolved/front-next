import { TripScriptAttraction } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getAttractions = async (tripId: string) => {
  const route = `attractions/${tripId}`;
  const tripAtractions = await ApiRequest.get<TripScriptAttraction[]>(route);
  return tripAtractions;
};
