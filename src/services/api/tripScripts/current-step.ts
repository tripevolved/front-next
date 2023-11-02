import { TripScriptStepInfo } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripScriptCurrentStep = async (tripId: string) => {
  const route = `scripts/${tripId}/current-step`;
  const tripScriptStep = await ApiRequest.get<TripScriptStepInfo>(route);
  return tripScriptStep;
};
