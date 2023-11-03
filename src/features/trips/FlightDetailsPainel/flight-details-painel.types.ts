import type { ComponentHTMLProps, TripTransportation } from "@/core/types";

export interface FlightDetailsPainelProps extends ComponentHTMLProps {
  transportationData: TripTransportation;
  isModalView?: boolean;
}
