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
import { getCheckoutById } from "./checkout";
import { getTripReservationsCountForDashboard } from "./reservations-count";
import { getTripTips } from "./tips";
import { getTripStatusById } from "./status";

export const TripsApiService = {
  getById: getTripDetailsById,
  getStatusById: getTripStatusById,
  getByIdForDashboard: getTripDetailsByIdForDashboard,
  getReservationsCountById: getTripReservationsCountForDashboard,
  getAll: getAllByTravelerId,
  getCurrentTripId: TripLocalService.get,
  getTripDestinationQuestions: getTripDestinationQuestions,
  getTripQuestions: getTripQuestions,
  postCreate: createTrip,
  getTripPending,
  getTips: getTripTips,
  getPriceById: getTripPriceById,
  getMatchedDestinations: getMatchedDestinations,
  setMatchedDestinations: putMatchedDestinations,
  setDestinationId: putDestinationIdForTrip,
  setTripConfiguration: editTrip,
  removeById,
  getItinerary,
  getCheckout: getCheckoutById,
};
