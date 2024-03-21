import { TripTransportation } from "./trip";

export interface CheckoutAccommodationDetails {
  id: string;
  checkIn: string;
  checkOut: string;
  coverImageUrl: string;
  name: string;
  tags: string;
  cancellationInfo: string;
  boardInfo: string;
  isRoomSelected: boolean;
  roomSelectionMessage: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
}

export interface CheckoutAccommodation {
  isSelected: boolean;
  notSelectedMessage: string;
  details: CheckoutAccommodationDetails[];
}

export interface CheckoutScript {
  isFinished: boolean;
  notFinishedMessage: string;
}

export interface CheckoutTransportation {
  isSelected: boolean;
  notSelectedMessage: string;
  flights: TripTransportation["flightView"][];
  hasTerrestrialRoute: boolean;
}

export interface Checkout {
  tripId: string;
  accommodation: CheckoutAccommodation;
  script: CheckoutScript;
  transportation: CheckoutTransportation;
}
