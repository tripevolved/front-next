import { CompanyFlightView } from "./trip";
import { TripStayRoomBoardChoice } from "./tripStay";

export interface CheckoutAccommodationDetails {
  id: string;
  checkIn: Date;
  checkOut: Date;
  coverImageUrl: string;
  name: string;
  tags: string;
  cancellationInfo: string;
  boardInfo: TripStayRoomBoardChoice | null;
  isRoomSelected: boolean;
  roomSelectionMessage: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  guests: number;
  rules: string[];
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
  flights: CheckoutFlight[] | null;
}

export interface Checkout {
  tripId: string;
  accommodation: CheckoutAccommodation;
  script: CheckoutScript;
  transportation: CheckoutTransportation;
}

export interface CheckoutFlight {
  description: string;
  from: string;
  to: string;
  flightView: CompanyFlightView;
}
