export interface TripStay {
  id: string; // AccommodationId
  coverImageUrl: string | null;
  cancellationInfo: string;
  name: string;
  tags: string;
  highlight: TripStayHighlight;
  details: TripStayDetails;
  isSelected: boolean;
  isBuilding: boolean;
  isReserved: boolean;
  message: string;
  reservationMessage: string;
}

export interface TripStayHighlight {
  title: string;
  description: string | null;
  type: "luxury" | "personnel" | "comfort" | "clean" | "rustic" | "location" | null;
}

export interface TripStayDetails {
  images: TripStayImage[] | null;
  information: string;
  checkInHour: string | null;
  address: string | null;
  price: number;
  currency: string;
  services: TripStayFeature[];
  rooms: TripStayRoom[];
}

interface TripStayImage {
  url: string;
  altText: string | null;
}

interface TripStayFeature {
  title: string;
  type: string | null;
}

export interface TripStayRoom {
  id: string; // AccommodationRoomId
  coverImageUrl: string;
  title: string;
  subtitle: string | null;
  isSelected: boolean;
  price: number;
  details: TripStayRoomDetails;
  features: TripStayRoomFeature[];
}

interface TripStayRoomDetails {
  information: string;
  amenities: string[] | null;
}

interface TripStayRoomFeature {
  title: string;
  type: string | null;
}

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
