import { TripStay, TripStayReservation, TripHotelListTransaction } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export interface RoomAccomodation extends Omit<Accomodation, "system" | "rooms"> {}

interface Accomodation {
  id?: string;
  code?: string;
  signature?: string;
  provider?: string;
  system: string;
  rooms: RoomAccomodation[];
}

export interface TripHotelDTO {
  uniqueTransactionId?: string;
  tripItineraryActionId?: string;
  accommodations: Accomodation[];
}

export interface AccommodationBody extends Omit<TripHotelDTO, "accommodations"> {
  accommodation: Accomodation;
}

export const getStayByTripId = async (tripId: string, tripItineraryActionId: string = "") => {
  const route = `stays/${tripId}?tripItineraryActionId=${tripItineraryActionId}`;
  const tripStay = await ApiRequest.get<TripStay>(route);
  return tripStay;
};

export const getAllReservedStaysByTripId = async (tripId: string) => {
  const route = `stays/${tripId}/reservations`;
  const tripStays = await ApiRequest.get<TripStayReservation[]>(route);
  return tripStays;
};

export const getTripHotelsToEditByTripId = async (
  tripId: string,
  tripItineraryActionId: string
) => {
  const route = `stays/${tripId}/options?accommodationActionId=${tripItineraryActionId}`;
  const tripHotels = await ApiRequest.post<TripHotelListTransaction>(route, {});
  return tripHotels;
};

export const getHotelDetails = async (tripId: string, accommodationData: AccommodationBody) => {
  const route = `stays/${tripId}/options/details`;
  const hotelDetails = await ApiRequest.post<TripStay>(route, accommodationData);
  return hotelDetails;
};

export const setTripHotelToStay = async (tripId: string, body: TripHotelDTO) => {
  const route = `stays/${tripId}/edit`;
  const tripHotels = await ApiRequest.put(route, body);
  return tripHotels;
};