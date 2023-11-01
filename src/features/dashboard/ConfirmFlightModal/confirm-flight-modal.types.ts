import type { ComponentHTMLProps, FlightDetails } from "@/core/types";

export interface ConfirmFlightModalProps extends ComponentHTMLProps {
  flightList?: FlightDetails[];
}

export interface FlightBoxProps extends FlightDetails {
  isOutbound?: boolean;
  hideTitle?: boolean;
}
