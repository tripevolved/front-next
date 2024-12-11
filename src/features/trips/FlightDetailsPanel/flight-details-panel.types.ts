import type { CompanyFlightView, ComponentHTMLProps, TripTransportation } from "@/core/types";

export interface FlightDetailsPanelProps extends ComponentHTMLProps {
  actionId: string;
  tripId: string;
}
