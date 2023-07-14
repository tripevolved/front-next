import { TripTravelers } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const setTripTravelers = async (body: Partial<TripTravelers>) => {
  const route = "travelers/trip/";
  const tripTravelers = await ApiRequest.post(route, body);
  return tripTravelers;
};
