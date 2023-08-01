import { TripFlightReservation } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getFlightReservationsByTripId = async (tripId: string) => {
  const route = `transportations/${tripId}/flight-reservations`;
  const tripFlights = await ApiRequest.get<TripFlightReservation[]>(route);
  return tripFlights;
};
