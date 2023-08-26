import type { ComponentHTMLProps, TripStayDetails } from "@/core/types";

export interface TripStayDetailsModalProps extends ComponentHTMLProps {
  stayData: TripStayDetails;
  name: string;
  address: string;
}
