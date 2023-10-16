import { TripStay, TripStayReservation, TripHotelListTransaction } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

interface RoomAccomodation extends Omit<Accomodation, "system" | "rooms"> {
  unitPrice: number;
  totalPrice: number;
  currency: string;
  boardChoice: string;
}

interface Accomodation {
  id?: string;
  code?: string;
  signature?: string;
  provider?: string;
  system: string;
  rooms: RoomAccomodation[];
}

export interface TripHotelDTO {
  uniqueTransactionId: string;
  accommodations: Accomodation[];
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
  const route = `stays/${tripId}/options`;
  const tripHotels = await ApiRequest.post<TripHotelListTransaction>(route, {});
  return tripHotels;
};

export const setTripHotelToStay = async (tripId: string, body: TripHotelDTO) => {
  const route = `stays/${tripId}/edit`;
  const tripHotels = await ApiRequest.put(route, body);
  return tripHotels;
};
