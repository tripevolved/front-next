import { RestaurantParameter } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const setRestaurantParametersToTrip = async (tripId: string, parameters: RestaurantParameter[]) => {
  const route = `restaurants/${tripId}/parameters`;
  const questions = await ApiRequest.put(route, parameters);
  return questions;
};
