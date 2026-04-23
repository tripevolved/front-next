import { putDestinationIdForTrip } from "./destination-set";
import { getTripDetailsById } from "./details";
import { getTripMatches } from "./trips";
import { createTrip, createEmptyTrip } from "./create";
import { getGoals } from "./goals";
import { getItinerary } from "./itinerary";
import { getTrips } from "./all";
import { createTripByAccommodation } from "./by-accommodation";
import {
  getTripAccommodations,
  getTripAccommodationById,
  getTripAccommodationReservation,
  postTripAccommodationBookings,
  postTripAccommodationCreate,
  postTripAccommodationRevalidate,
} from "./accommodations";
import { postTripPrice } from "./price";
import { getTripTravelers, postTripTravelers } from "./travelers";

export const TripsApiService = {
  getTrips,
  setDestinationIdForTrip: putDestinationIdForTrip,
  getTripDetailsById,
  getTripAccommodations,
  getTripAccommodationById,
  getTripAccommodationReservation,
  postTripAccommodationBookings,
  postTripAccommodationCreate,
  postTripAccommodationRevalidate,
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