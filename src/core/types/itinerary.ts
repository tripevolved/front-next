import { TripImage, TripTransportation, TripVideo } from "./trip";

export type ItineraryActionType = "ROUTE" | "FLIGHT" | "ACCOMMODATION" | "CRUISE" | "DAY_BY_DAY";

export interface TripAccommodation {
  tripAccommodationId: string;
  accommodationUniqueName: string;
  name: string;
  description: string;
  tags: string[];
  recommendedFor: string[];
  coverImage?: TripImage;
}

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
  tripAccommodation?: TripAccommodation;
}

export interface TripItineraryActionHighlight {
  description: string;
}

export interface TripUniqueMoment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: TripImage[];
}

export interface TripItinerary {
  tripId: string;
  descriptionImage: TripImage;
  actions: TripItineraryAction[];
  uniqueMoments?: TripUniqueMoment[];
}
