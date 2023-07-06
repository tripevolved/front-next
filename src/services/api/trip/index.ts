import { getTripDetailsById } from "./details";
import { getTripDetailsByIdForDashboard } from "./dashboard";
import { getAllByTravelerId } from "./all";
import { getTripOnboardingQuestions, getTripQuestions } from "./questions";
import { TripLocalService } from "./local";
import { createTrip } from "./create";
import { getTripPriceById } from "./price";

export const TripsApiService = {
  getById: getTripDetailsById,
  getByIdForDashboard: getTripDetailsByIdForDashboard,
  getAll: getAllByTravelerId,
  getCurrentTripId: TripLocalService.get,
  getTripOnboardingQuestions: getTripOnboardingQuestions,
  getTripQuestions: getTripQuestions,
  postCreate: createTrip,
  getPriceById: getTripPriceById
};
