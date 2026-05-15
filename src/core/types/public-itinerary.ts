import type { TripDetails, TripImage, TripVideo } from "./trip";

export type PublicAccommodationReservationStatus =
  | "CONFIRMED"
  | "PENDING"
  | "CANCELED"
  | "REJECTED";

export type PublicAccommodationPaymentStatus = "PAID" | "NOT_PAID";

/** Public share payload — mirrors authenticated itinerary response shape. */
export type PublicItineraryActionType = "ROUTE" | "FLIGHT" | "ACCOMMODATION" | "CRUISE" | "DAY_BY_DAY";

export interface PublicTripAccommodationRoom {
  name: string;
  description?: string | null;
  adults?: number | null;
  children?: number | null;
  boardDescription?: string | null;
  hasBreakfast?: boolean | null;
  hasHalfBoard?: boolean | null;
  hasFullBoard?: boolean | null;
  isAllInclusive?: boolean | null;
  externalReservationId?: string | null;
  reservationStatusReason?: string | null;
  reservationStatus?: PublicAccommodationReservationStatus | null;
  paymentStatus?: PublicAccommodationPaymentStatus | null;
  cancellationPolicy?: string | null;
  coverImage?: TripImage | null;
}

export interface PublicTripAccommodation {
  tripAccommodationId: string;
  accommodationUniqueName: string;
  name: string;
  description: string;
  tags?: string[] | null;
  recommendedFor?: string[] | null;
  coverImage?: TripImage | null;
  images?: TripImage[] | null;
  videos?: TripVideo[] | null;
  rooms?: PublicTripAccommodationRoom[] | null;
}

export interface PublicTripItineraryAction {
  tripItineraryActionId: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  type: PublicItineraryActionType;
  previousTripItineraryActionId?: string;
  nextTripItineraryActionId?: string;

  coverImage?: TripImage;
  videos?: TripVideo[];
  highlight?: PublicTripItineraryActionHighlight;
  tripAccommodation?: PublicTripAccommodation | null;
}

export interface PublicTripItineraryActionHighlight {
  description: string;
}

export interface PublicTripUniqueMoment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: TripImage[];
}

/** Travelers included in the public itinerary payload (share link). */
export interface PublicTripTraveler {
  name: string;
}

export interface PublicTripItinerary {
  tripId: string;
  /** Same shape as GET /trips/{id} — used for the share page hero. */
  tripDetails: TripDetails;
  descriptionImage: TripImage;
  actions: PublicTripItineraryAction[];
  uniqueMoments?: PublicTripUniqueMoment[];
  travelers?: PublicTripTraveler[] | null;
}

export type ItineraryShareResponse = {
  shareToken: string;
};
