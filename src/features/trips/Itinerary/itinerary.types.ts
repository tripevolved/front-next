import { ComponentHTMLProps, ItineraryActionType } from "@/core/types/";

export interface ItineraryProps {
  tripId: string;
  title: string;
}

export interface ItineraryItemProps extends ComponentHTMLProps {
  title: string;
  actionType: ItineraryActionType;
}
