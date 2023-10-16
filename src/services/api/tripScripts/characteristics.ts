import { TripScriptCharacteristics } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripCharacteristics = async (tripId: string) => {
  const route = `scripts/${tripId}/characteristics`;
  const tripChars = await ApiRequest.get<TripScriptCharacteristics>(route);
  return tripChars;
};
