import { TripScriptParameters } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const setTripScriptParameters = async (parameters: TripScriptParameters) => {
console.log(parameters);

  const route = `scripts/parameters`;
  await ApiRequest.post(route, parameters);
};
