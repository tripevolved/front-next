import { getTripDetailsByIdForDashboard } from "./dashboard";
import { getTripDestinationQuestions, getTripQuestions } from "./questions";
import { createTrip } from "./create";
import { createTripByAccommodation } from "./by-accommodation";
import { getTripPending } from "./pendings";
import { getTripPriceById } from "./price";
import { editTrip } from "./configuration";
import { removeById } from "./remove";
import { getCheckoutById } from "./checkout";
import { getTripReservationsCountForDashboard } from "./reservations-count";
import { getTripTips } from "./tips";

export const TripsApiService = {
  getByIdForDashboard: getTripDetailsByIdForDashboard,
  getReservationsCountById: getTripReservationsCountForDashboard,
  getTripDestinationQuestions: getTripDestinationQuestions,
  getTripQuestions: getTripQuestions,
  postCreate: createTrip,
  postCreateByAccommodation: createTripByAccommodation,
  getTripPending,
  getTips: getTripTips,
  getPriceById: getTripPriceById,
  setTripConfiguration: editTrip,
  removeById,
  getCheckout: getCheckoutById,
};
