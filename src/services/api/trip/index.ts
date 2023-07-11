import { getTripDetailsById } from "./details";
import { getTripDetailsByIdForDashboard } from "./dashboard";
import { getAllByTravelerId } from "./all";
import { getTripDestinationQuestions, getTripQuestions } from "./questions";
import { putMatchedDestinations, getMatchedDestinations } from "./matches";
import { TripLocalService } from "./local";
import { createTrip } from "./create";
import { getTripPendings } from "./pendings";
import { getTripPriceById } from "./price";
import { putDestinationIdForTrip } from "./destination-set";

export const TripsApiService = {
  getById: getTripDetailsById,
  getByIdForDashboard: getTripDetailsByIdForDashboard,
  getAll: getAllByTravelerId,
  getCurrentTripId: TripLocalService.get,
  getTripDestinationQuestions: getTripDestinationQuestions,
  getTripQuestions: getTripQuestions,
  postCreate: createTrip,
  getTripPendings,
  getPriceById: getTripPriceById,
  getMatchedDestinations: getMatchedDestinations,
  setMatchedDestinations: putMatchedDestinations,
  setDestinationId: putDestinationIdForTrip,
};
