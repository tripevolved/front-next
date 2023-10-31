import type { ComponentHTMLProps, FlightDetails } from "@/core/types";

export interface ConfirmFlightModalProps extends ComponentHTMLProps {}

export interface FlightBoxProps extends FlightDetails {
  typeFlight: "outbound" | "return";
  departureDate: string;
  departureCityInitials: string;
  departureAirport: string;
  arrivalDate: string;
  arrivalCityInitials: string;
  arrivalAirport: string;
}
