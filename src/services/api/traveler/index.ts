import { getTravelerState } from "./state";
import { getTripTravelers } from "./travelers";
import { setTripTravelers } from "./set-travelers";

export const TravelerApiService = {
  getTravelerState: getTravelerState,
  getTripTravelers,
  setTripTravelers,
};
