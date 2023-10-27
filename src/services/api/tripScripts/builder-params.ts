import { TripScriptBuilderParams } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripScriptBuilderParams = async (tripId: string) => {
  const route = `scripts/${tripId}/builder-params`;
  const params = await ApiRequest.get<TripScriptBuilderParams>(route);
  return params;
};
