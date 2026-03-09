import { TripImage, TripTransportation, TripVideo } from "./trip";

export type ItineraryActionType = "ROUTE" | "FLIGHT" | "ACCOMMODATION" | "CRUISE" | "DAY_BY_DAY";

export interface TripItineraryAction {
  tripItineraryActionId: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  type: ItineraryActionType;
  previousTripItineraryActionId?: string;
  nextTripItineraryActionId?: string;

  coverImage?: TripImage;
  videos?: TripVideo[];
  highlight?: TripItineraryActionHighlight;
}

export interface TripItineraryActionHighlight {
  description: string;
}

export interface TripItinerary {
  tripId: string;
  descriptionImage: TripImage;
  actions: TripItineraryAction[];
}
