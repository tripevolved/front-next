import { getTripDetailsById } from "./details";
import { getTripDetailsByIdForDashboard } from "./dashboard";
import { getAllByTravelerId } from "./all";
import { getTripDestinationQuestions, getTripQuestions } from "./questions";
import { putMatchedDestinations, getMatchedDestinations } from "./matches";
import { TripLocalService } from "./local";
import { createTrip } from "./create";
import { getTripPending } from "./pendings";
import { getTripPriceById } from "./price";
import { putDestinationIdForTrip } from "./destination-set";
import { editTrip } from "./configuration";
import { removeById } from "./remove";
import { getItinerary } from "./itinerary";
import { getTripReservationsCountForDashboard } from "./reservations-count";

export const TripsApiService = {
  getById: getTripDetailsById,
  getByIdForDashboard: getTripDetailsByIdForDashboard,
  getReservationsCountById: getTripReservationsCountForDashboard,
  getAll: getAllByTravelerId,
  getCurrentTripId: TripLocalService.get,
  getTripDestinationQuestions: getTripDestinationQuestions,
  getTripQuestions: getTripQuestions,
  postCreate: createTrip,
  getTripPending,
  getPriceById: getTripPriceById,
  getMatchedDestinations: getMatchedDestinations,
  setMatchedDestinations: putMatchedDestinations,
  setDestinationId: putDestinationIdForTrip,
  setTripConfiguration: editTrip,
  removeById,
  getItinerary,
};
