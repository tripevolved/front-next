import { TripScriptDayTip } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripScriptDayTip = async (tripId: string, day: number) => {
  const route = `scripts/${tripId}/day-tip?day=${day}`;
  const tripScriptDayTip = await ApiRequest.get<TripScriptDayTip>(route);
  return tripScriptDayTip;
};
