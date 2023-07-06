export type TripPendingActionType =
  | "documents"
  | "share"
  | "flight"
  | "flight-seating"
  | "room"
  | "attractions"
  | "special-request"
  | "purchase-luggage"
  | "transfer"
  | "insurance";

export interface TripPendingAction {
  id: string;
  slug: TripPendingActionType;
  isMandatory: boolean;
  title: string;
  description: string;
  deadline: string;
}
