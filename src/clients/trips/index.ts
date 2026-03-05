import { getTripDetailsById } from "./details";
import { getTripMatches } from "./trips";
import { createTrip, createEmptyTrip } from "./create";
import { getGoals } from "./goals";

export const TripsApiService = {
  getTripDetailsById,
  getTripMatches,
  createTrip,
  createEmptyTrip,
  getGoals
}; 