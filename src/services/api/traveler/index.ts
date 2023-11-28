import { getTravelerState } from "./state";
import { getTripTravelers } from "./travelers";
import { setTripTravelers } from "./set-travelers";
import { createTravelers } from "./create-travelers";

export const TravelerApiService = {
  getTravelerState,
  getTripTravelers,
  setTripTravelers,
  create: createTravelers,
};
