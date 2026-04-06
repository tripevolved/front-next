import { getTripDetailsByIdForDashboard } from "./dashboard";
import { getTripDestinationQuestions, getTripQuestions } from "./questions";
import { getTripPending } from "./pendings";
import { removeById } from "./remove";

export const TripsApiService = {
  getByIdForDashboard: getTripDetailsByIdForDashboard,
  getTripDestinationQuestions: getTripDestinationQuestions,
  getTripQuestions: getTripQuestions,
  getTripPending,
  removeById,
};
