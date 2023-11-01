import { TripScriptParameters } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const setTripScriptParameters = async (parameters: TripScriptParameters) => {
  const route = `scripts/parameters`;
  await ApiRequest.post(route, parameters);
};
