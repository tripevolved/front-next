import { getTransportationByTripId } from "./by-trip";
import { getFlightReservationsByTripId } from "./flights";

export const TransportationApiService = { getByTripId: getTransportationByTripId, getFlightReservationsById: getFlightReservationsByTripId };
