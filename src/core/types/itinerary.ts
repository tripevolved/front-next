import { TripTransportation } from "./trip";
import { TripStaySimplified } from "./tripStay";

export type ItineraryActionType = "ROUTE" | "FLIGHT" | "ACCOMMODATION" | "RENTAL_CAR" | "TRANSFER";

export interface Coordinates {
  title: string;
  latitude: number;
  longitude: number;
}

export interface ItineraryAction {
  tripItineraryActionId: string;
  from: Coordinates;
  to: Coordinates;
  type: ItineraryActionType;
  needsTravelerAction: boolean;
  isMain: boolean;
  isReady: boolean;
  title: string;
}

export interface ItineraryList {
  tripId: string;
  actions: ItineraryAction[];
}

export interface ItineraryListV2 {
  tripId: string;
  isReady: boolean;
  stays:TripStaySimplified[],
  transportations: TripTransportation[]
}

export interface SimpleItineraryAction {
  type: ItineraryActionType;
  title: string;
}

export interface SimpleItinerary {
  actions: SimpleItineraryAction[];
}
