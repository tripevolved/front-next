import { getTransportationByTripId, getTransportationActionItinerary } from "./by-trip";
import { getFlightReservationsByTripId } from "./flights";

export const TransportationApiService = {
  getByTripId: getTransportationByTripId,
  getFlightReservationsById: getFlightReservationsByTripId,
  getTransportationActionItinerary,
};
