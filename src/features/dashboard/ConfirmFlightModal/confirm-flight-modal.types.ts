import type { ComponentHTMLProps, FlightDetails } from "@/core/types";

export interface ConfirmFlightModalProps extends ComponentHTMLProps {}

export interface FlightBoxProps extends FlightDetails {
  isOutbound?: boolean;
}
