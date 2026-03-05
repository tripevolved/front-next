import { getTripDetailsByIdForDashboard } from "./dashboard";
import { getAllByTravelerId } from "./all";
import { getTripDestinationQuestions, getTripQuestions } from "./questions";
import { putMatchedDestinations, getMatchedDestinations } from "./matches";
import { createTrip } from "./create";
import { getTripPending } from "./pendings";
import { getTripPriceById } from "./price";
import { editTrip } from "./configuration";
import { removeById } from "./remove";
import { getItinerary, getItineraryV2 } from "./itinerary";
import { getCheckoutById } from "./checkout";
import { getTripReservationsCountForDashboard } from "./reservations-count";
import { getTripTips } from "./tips";

export const TripsApiService = {
  getByIdForDashboard: getTripDetailsByIdForDashboard,
  getReservationsCountById: getTripReservationsCountForDashboard,
  getAll: getAllByTravelerId,
  getTripDestinationQuestions: getTripDestinationQuestions,
  getTripQuestions: getTripQuestions,
  postCreate: createTrip,
  getTripPending,
  getTips: getTripTips,
  getPriceById: getTripPriceById,
  getMatchedDestinations: getMatchedDestinations,
  setMatchedDestinations: putMatchedDestinations,
  setTripConfiguration: editTrip,
  removeById,
  getItinerary,
  getItineraryV2,
  getCheckout: getCheckoutById,
};
