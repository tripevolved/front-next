import { TripPendingAction } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripPending = async (tripId: string) => {
  const route = `trip-actions/${tripId}/pending`;
  return await ApiRequest.get<TripPendingAction[]>(route);
};
