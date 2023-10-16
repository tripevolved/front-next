import type { ComponentHTMLProps, TripStay } from "@/core/types";

export interface TripStayDetailsProps extends ComponentHTMLProps {
  stayData: TripStay;
  tripId: string;
  isModalView?: boolean;
  uniqueTransactionId?: string;
}
