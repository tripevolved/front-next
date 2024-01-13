import type { ComponentHTMLProps, TripStay } from "@/core/types";
import { NextRouter } from "next/router";

export interface AccommodationDetailProps extends ComponentHTMLProps {
  data: TripStay;
  tripId: string;
  itineraryActionId?: string;
  router: NextRouter;
  onCloseModal?: VoidFunction;
}
