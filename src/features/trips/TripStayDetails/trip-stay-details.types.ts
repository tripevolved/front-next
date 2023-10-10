import type { ComponentHTMLProps, TripStayDetails } from "@/core/types";

export interface TripStayDetailsProps extends ComponentHTMLProps {
  stayData: TripStayDetails;
  name: string;
  tripId: string;
  isModalView?: boolean;
}
