import { TripStay } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getStayByTripId = async (tripId: string) => {
  const route = `stays/${tripId}`;
  const tripStay = await ApiRequest.get<TripStay>(route);
  return tripStay;
};
