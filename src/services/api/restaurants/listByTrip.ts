import { Restaurant } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getRestaurantsByTripId = async (tripId: string) => {
  const route = `restaurants/${tripId}`;
  const questions = await ApiRequest.get<Restaurant[]>(route);
  return questions;
};
