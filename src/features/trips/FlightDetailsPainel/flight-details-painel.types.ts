import type { CompanyFlightView, ComponentHTMLProps, TripTransportation } from "@/core/types";

export interface FlightDetailsPainelProps extends ComponentHTMLProps {
  flightView: CompanyFlightView;
  isModalView?: boolean;
}
