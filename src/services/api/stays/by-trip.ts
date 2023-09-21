import { TripStay, TripStayReservation, TripHotelList } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export interface TripHotelDTO {
  id: string;
  roomId: string;
  roomSignature: string;
  unitPrice: number;
  totalPrice: number;
  currency: string;
}

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

export const getTripHotelsToEditByTripId = async (tripId: string) => {
  const route = `stays/${tripId}/edit`;
  const tripHotels = await ApiRequest.get<TripHotelList>(route);
  return tripHotels;
}

export const setTripHotelToStay = async (tripId: string, body: TripHotelDTO) => {
  const route = `stays/${tripId}/edit`;
  const tripHotels = await ApiRequest.put(route, body);
  return tripHotels;
}
