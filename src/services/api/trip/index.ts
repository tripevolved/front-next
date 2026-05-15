import { getTripDestinationQuestions, getTripQuestions } from "./questions";
import { removeById } from "./remove";

export const TripsApiService = {
  getTripDestinationQuestions: getTripDestinationQuestions,
  getTripQuestions: getTripQuestions,
  removeById,
};
