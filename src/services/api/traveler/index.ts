import { getTripTravelers } from "./travelers";
import { setTripTravelers } from "./set-travelers";
import { createTravelers } from "./create-travelers";

export const TravelerApiService = {
  getTripTravelers,
  setTripTravelers,
  create: createTravelers,
};
