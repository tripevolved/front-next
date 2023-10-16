import { TripScriptDay } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripScriptDaySuggestion = async (tripId: string, day: number) => {
  const route = `scripts/${tripId}/day-suggestion?day=${day}`;
  const tripScriptDay = await ApiRequest.get<TripScriptDay>(route);
  return tripScriptDay;
};
