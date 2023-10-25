import { RestaurantDetail } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getRestaurantDetailsById = async (id: string) => {
  const route = `restaurants/${id}/details`;
  const questions = await ApiRequest.get<RestaurantDetail>(route);
  return questions;
};
