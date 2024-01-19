import { Photo } from "./photo";

export interface TripStay {
  id?: string; // AccommodationId
  code?: string;
  signature?: string;
  provider?: string;
  system: string;
  coverImage: Photo | null;
  cancellationInfo: string;
  checkIn: Date;
  checkOut: Date;
  name: string;
  tags: string;
  highlight?: TripStayHighlight;
  details: TripStayDetails;
  isSelected: boolean;
  isBuilding: boolean;
  isReserved: boolean;
  isRoomSelected: boolean;
  message: string;
  reservationMessage: string | null;
  roomSelectionMessage: string | null;
}

export type TripStayHighlightFeature =
  | "luxury"
  | "personnel"
  | "comfort"
  | "clean"
  | "rustic"
  | "location";

export interface TripStayHighlight {
  title: string;
  description: string | null;
  type: TripStayHighlightFeature | null;
}

export interface TripStayDetails {
  images: Photo[] | null;
  information: string;
  checkInHour: string | null;
  address: string | null;
  price: number;
  currency: string;
  services: TripStayFeature[];
  rooms: TripStayRoom[];
}

type TripStayFeatureType = "ac" | "wifi" | "breakfast" | "bed" | "close_to_attractions";

export interface TripStayFeature {
  title: string;
  // TODO: redefine these types
  type: TripStayFeatureType | null;
}

export interface TripStayRoom {
  id: string; // AccommodationRoomId
  code?: string;
  signature?: string;
  provider?: string;
  coverImageUrl?: string;
  title: string;
  subtitle: string | null;
  isSelected: boolean;
  price: number;
  details: TripStayRoomDetails;
  features: TripStayRoomFeature[];
  boardChoice?: "RO" | "BB" | "AI";
  currency: string;
}

interface TripStayRoomDetails {
  information: string;
  amenities: string[] | null;
}

interface TripStayRoomFeature extends TripStayFeature {}

export interface TripStayReservation {
  id: string; // reservation id
  imageUrl: string | null;
  title: string;
  isReserved: boolean;
  checkIn: Date;
  checkOut: Date;
  roomDetail: string;
  fullAddress: string;
}

export interface TripHotelListTransaction {
  uniqueTransactionId: string;
  curated: Omit<TripStay, "highlight">[];
  others?: Omit<TripStay, "highlight">[];
}
