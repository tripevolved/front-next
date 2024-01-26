import type { ComponentHTMLProps, TripStay } from "@/core/types";
import type { NextRouter } from "next/router";

export interface TripStayDetailsProps extends ComponentHTMLProps {
  stayData: TripStay;
  tripId: string;
  uniqueTransactionId?: string;
  router: NextRouter;
  onCloseModal?: () => void;
}
