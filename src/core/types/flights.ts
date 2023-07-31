export interface TripFlightReservation {
  departure: Date;
  estimatedArrival: Date;
  arrivalAtAirport: Date | null;
  reservationTrackerId: string;
  fromAirportCode: string;
  toAirportCode: string;
  fromAirportName: string;
  toAirportName: string;
  fromAirportCity: string;
  toAirportCity: string;
  flightCode: string;
  seats: string[] | null;
  gate: string | null;
  legs: TripFlightLeg[];
  tickets: TripFlightTicket[];
}

export interface TripFlightLeg {
  departure: Date;
  estimatedArrival: Date;
  companyName: string;
  companyLogoUrl: string | null;
  companyReservationTrackerId: string;
  fromAirportCode: string;
  toAirportCode: string;
  fromAirportName: string;
  toAirportName: string;
  fromAirportCity: string;
  toAirportCity: string;
  flightCode: string;
  seats: string[] | null;
  gate: string | null;
  luggageInfo: TripFlightLuggageInfo[];
}

export interface TripFlightLuggageInfo {
  type: "normal",
  maxWeight: number;
  maxSize: number | null;
}

export interface TripFlightTicket {
  ticketNumber: string;
  passenger: string;
  passengerDocument: string;
  hasCheckedIn: boolean;
  qrCode: string;
  conditions: string | null;
}