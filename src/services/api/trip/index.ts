import { getTripDetailsById } from "./details";
import { getTripOnboardingQuestions, getTripQuestions } from "./questions";
import { TripLocalService } from "./local";

export const TripsApiService = {
  getById: getTripDetailsById,
  getCurrentTripId: TripLocalService.get,
  getTripOnboardingQuestions: getTripOnboardingQuestions,
  getTripQuestions: getTripQuestions,
};
