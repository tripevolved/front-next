import { putDestinationIdForTrip } from "./destination-set";
import { putTripCollection } from "./collection";
import { getTripDetailsById } from "./details";
import { getTripMatches } from "./trips";
import { createTrip, createEmptyTrip } from "./create";
import { getGoals } from "./goals";
import { getItinerary, getItineraryIfPresent, createItinerary } from "./itinerary";
import { getPublicItinerary, postItineraryShare } from "./itinerary-share";
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
  putTripCollection,
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
  getItineraryIfPresent,
  createItinerary,
  postItineraryShare,
  getPublicItinerary,
  createTripByAccommodation
}; 