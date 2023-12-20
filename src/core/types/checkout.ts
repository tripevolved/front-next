import { TripTransportation } from "./trip";

export interface CheckoutAccommodationDetails {
  id: string;
  checkIn: string;
  checkOut: string;
  coverImageUrl: string;
  name: string;
  tags: string;
  cancellationInfo: string;
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

interface CheckoutTransportationDetails
  extends Pick<
    TripTransportation,
    "iconSlug" | "partnerLogoUrl" | "fromName" | "toName" | "fromAddress" | "toAddress"
  > {
  flight: TripTransportation["flightView"];
}

export interface CheckoutTransportation {
  isSelected: boolean;
  notSelectedMessage: string;
  details: CheckoutTransportationDetails[];
}

export interface Checkout {
  tripId: string;
  accommodation: CheckoutAccommodation;
  script: CheckoutScript;
  transportation: CheckoutTransportation;
}
