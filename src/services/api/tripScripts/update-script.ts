import { UpdateTripScriptPayload } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const updateScript = async (tripId: string, data: UpdateTripScriptPayload) => {
  const route = `scripts/${tripId}/day`;
  const response = await ApiRequest.put<UpdateTripScriptPayload>(route, data);
  return response;
};
