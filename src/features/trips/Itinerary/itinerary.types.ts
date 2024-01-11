import { ComponentHTMLProps, ItineraryActionType } from "@/core/types/";
import { NextRouter } from "next/router";

export interface ItineraryProps {
  tripId: string;
  title: string;
}

export interface ItineraryItemProps extends ComponentHTMLProps {
  title: string;
  actionType: ItineraryActionType;
}

export interface SeeMoreAccommodationProps {
  tripId: string;
  itineraryActionId?: string;
  router: NextRouter;
  onCloseModal?: VoidFunction;
}
