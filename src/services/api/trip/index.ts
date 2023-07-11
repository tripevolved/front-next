import { getTripDetailsById } from "./details";
import { getTripDetailsByIdForDashboard } from "./dashboard";
import { getAllByTravelerId } from "./all";
import { getTripDestinationQuestions, getTripQuestions } from "./questions";
import { putMatchedDestinations } from "./matches";
import { TripLocalService } from "./local";
import { createTrip } from "./create";
import { getTripPriceById } from "./price";

export const TripsApiService = {
  getById: getTripDetailsById,
  getByIdForDashboard: getTripDetailsByIdForDashboard,
  getAll: getAllByTravelerId,
  getCurrentTripId: TripLocalService.get,
  getTripDestinationQuestions: getTripDestinationQuestions,
  getTripQuestions: getTripQuestions,
  postCreate: createTrip,
  getPriceById: getTripPriceById,
  getMatchedDestinations: putMatchedDestinations
};
