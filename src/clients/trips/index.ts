import { putDestinationIdForTrip } from "./destination-set";
import { getTripDetailsById } from "./details";
import { getTripMatches } from "./trips";
import { createTrip, createEmptyTrip } from "./create";
import { getGoals } from "./goals";
import { getItinerary } from "./itinerary";
import { getTrips } from "./all";
import { createTripByAccommodation } from "./by-accommodation";
import { putTripConfiguration } from "./configuration";
import {
  getTripAccommodations,
  getTripAccommodationById,
  getTripAccommodationReservation,
  postTripAccommodationBookings,
  postTripAccommodationCreate,
  postTripAccommodationRevalidate,
  deleteTripAccommodation,
} from "./accommodations";
import { postTripPrice } from "./price";
import { getTripTravelers, postTripTravelers } from "./travelers";

export const TripsApiService = {
  getTrips,
  setDestinationIdForTrip: putDestinationIdForTrip,
  getTripDetailsById,
  putTripConfiguration,
  getTripAccommodations,
  getTripAccommodationById,
  getTripAccommodationReservation,
  postTripAccommodationBookings,
  postTripAccommodationCreate,
  postTripAccommodationRevalidate,
  deleteTripAccommodation,
  postTripPrice,
  getTripTravelers,
  postTripTravelers,
  getTripMatches,
  createTrip,
  createEmptyTrip,
  getGoals,
  getItinerary,
  createTripByAccommodation
}; 