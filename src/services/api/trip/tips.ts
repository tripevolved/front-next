import { TripTip } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripTips = async (tripId: string) => {
  const route = `trips/${tripId}/tips`;
  return await ApiRequest.get<TripTip[]>(route);
};
