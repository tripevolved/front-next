import { TripStay, TripStayReservation } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getStayByTripId = async (tripId: string) => {
  const route = `stays/${tripId}`;
  const tripStay = await ApiRequest.get<TripStay>(route);
  return tripStay;
};

export const getAllReservedStaysByTripId = async (tripId: string) => {
  const route = `stays/${tripId}/reservations`;
  const tripStays = await ApiRequest.get<TripStayReservation[]>(route);
  return tripStays;
};
