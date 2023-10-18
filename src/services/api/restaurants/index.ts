import { getRestaurantDetailsById } from "./details";
import { getRestaurantsByTripId } from "./listByTrip";
import { setRestaurantParametersToTrip } from "./parameters";
import { getQuestions } from "./questions";

export const RestaurantsApiService = {
  getQuestions,
  getRestaurants: getRestaurantsByTripId,
  getRestaurantDetail: getRestaurantDetailsById,
  setParameters: setRestaurantParametersToTrip
};
