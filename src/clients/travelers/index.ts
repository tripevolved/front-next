import { createTraveler } from "./travelers";
import { travelerState } from "./state";

export const TravelerService = {
  createTraveler,
  getTravelerState: travelerState
};

