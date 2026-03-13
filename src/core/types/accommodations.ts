export interface PublicAccommodation {
  id: string;
  uniqueName: string;
  title: string;
  subtitle: string | null;
  description: string;
  images: PublicAccommodationImage[];
  highlights: PublicAccommodationHighlight[];
  amenities: PublicAccommodationAmenity[];
  location: PublicAccommodationLocation;
  checkInInfo?: {
    hour: string;
    instructions?: string;
  };
  checkOutInfo?: {
    hour: string;
    instructions?: string;
  };
  recommendedFor: string[]; // e.g., ["Casais", "Lua de mel", "Romântico"]
  tags?: string; // e.g., "5 estrelas", "Luxo"
  rooms?: PublicAccommodationRoom[];
}

export interface PublicAccommodationImage {
  url: string;
  shortDescription?: string;
  isCover: boolean;
  width?: number;
  height?: number;
}

export interface PublicAccommodationHighlight {
  title: string;
  description: string;
  icon?: string; // Optional emoji or icon identifier
  imageUrl?: string; // Optional background/featured image
}

export interface PublicAccommodationAmenity {
  title: string;
  icon?: string; // Optional icon identifier
  category?: "essential" | "luxury" | "wellness" | "dining" | "entertainment";
}

export interface PublicAccommodationLocation {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  nearbyAttractions?: string[];
}

export interface PublicAccommodationRoom {
  id: string;
  title: string;
  subtitle: string | null;
  images: PublicAccommodationImage[];
  amenities: PublicAccommodationAmenity[];
}

export interface PublicAccommodationRoomAvailability extends PublicAccommodationRoom {
  price: number;
  currency: string;
  cancellationPolicy: string;
  taxes?: {
    amount: number;
    description: string;
  }[];
}

export interface AccommodationAvailabilityResponse {
  transactionId: string;
  rooms: PublicAccommodationRoomAvailability[];
}
