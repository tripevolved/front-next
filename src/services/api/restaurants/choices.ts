import { RestaurantChoice } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export interface RestaurantChoicesReturn {
  message?: string | null;
  isSuccess?: boolean;
}

export const setRestaurantChoices = async (tripId: string, choices: RestaurantChoice[]) => {
  const route = `restaurants/choices`;
  const restaurantChoiceReturn = await ApiRequest.put<RestaurantChoicesReturn>(route, {
    tripId: tripId,
    choices: choices,
  });
  return restaurantChoiceReturn;
};
