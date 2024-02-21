import { TripStay } from "@/core/types";
import { NextRouter } from "next/router";

export interface StayDetailsModalProps {
  tripId: string;
  itineraryActionId?: string;
  router: NextRouter;
  onCloseModal?: VoidFunction;
  tripStay: TripStay;
  allowEdit: Boolean;
}
