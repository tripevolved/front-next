import { getTripDetailsById } from "./details";
import { getAllByTravelerId } from "./all";
import { getTripOnboardingQuestions, getTripQuestions } from "./questions";
import { TripLocalService } from "./local";
import { createTrip } from "./create";

export const TripsApiService = {
  getById: getTripDetailsById,
  getAll: getAllByTravelerId,
  getCurrentTripId: TripLocalService.get,
  getTripOnboardingQuestions: getTripOnboardingQuestions,
  getTripQuestions: getTripQuestions,
  postCreate: createTrip,
};
