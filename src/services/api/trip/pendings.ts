import { TripPendingAction } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripPendings = async (tripId: string) => {
  const route = `trip-actions/${tripId}/pending`;
  const tripPendings = await ApiRequest.get<TripPendingAction[]>(route);
  return tripPendings;
};
