import type { ComponentHTMLProps, TripStay } from "@/core/types";
import type { NextRouter } from "next/router";

export interface TripStayDetailsProps extends ComponentHTMLProps {
  stayData: TripStay;
  tripId: string;
  isModalView?: boolean;
  uniqueTransactionId?: string;
  router: NextRouter;
}
