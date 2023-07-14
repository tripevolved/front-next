import { TripTravelers } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripTravelers = async (tripId: string) => {
  const route = `travelers/trip/${tripId}`;
  const tripTravelers = await ApiRequest.get<TripTravelers>(route);
  return tripTravelers;
};
