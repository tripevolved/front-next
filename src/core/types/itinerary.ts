import { TripStayDetails } from "@/features";
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
export type Action = TripStaySimplified |TripTransportation
export const IsStayAction = (action: Action):action is TripStaySimplified => {
  return action.hasOwnProperty('coverImage')
}
export const IsTransportationAction = (action: Action):action is TripTransportation => {
  return action.hasOwnProperty('partnerLogoUrl')
}
export interface SimpleItineraryAction {
  type: ItineraryActionType;
  title: string;
}

export interface SimpleItinerary {
  actions: SimpleItineraryAction[];
}
