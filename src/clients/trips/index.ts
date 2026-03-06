import { putDestinationIdForTrip } from "./destination-set";
import { getTripDetailsById } from "./details";
import { getTripMatches } from "./trips";
import { createTrip, createEmptyTrip } from "./create";
import { getGoals } from "./goals";
import { getItinerary } from "./itinerary";

export const TripsApiService = {
  setDestinationIdForTrip: putDestinationIdForTrip,
  getTripDetailsById,
  getTripMatches,
  createTrip,
  createEmptyTrip,
  getGoals,
  getItinerary
}; 