export interface PublicStay {
  id: string;
  uniqueName: string;
  title: string;
  subtitle: string | null;
  description: string;
  images: PublicStayImage[];
  highlights: PublicStayHighlight[];
  amenities: PublicStayAmenity[];
  location: PublicStayLocation;
  checkInInfo?: {
    hour: string;
    instructions?: string;
  };
  checkOutInfo?: {
    hour: string;
    instructions?: string;
  };
  cancellationPolicy?: string;
  recommendedFor: string[]; // e.g., ["Casais", "Lua de mel", "Romântico"]
  tags?: string; // e.g., "5 estrelas", "Luxo"
}

export interface PublicStayImage {
  url: string;
  shortDescription?: string;
  isCover: boolean;
  width?: number;
  height?: number;
}

export interface PublicStayHighlight {
  title: string;
  description: string;
  icon?: string; // Optional emoji or icon identifier
  imageUrl?: string; // Optional background/featured image
}

export interface PublicStayAmenity {
  title: string;
  icon?: string; // Optional icon identifier
  category?: "essential" | "luxury" | "wellness" | "dining" | "entertainment";
}

export interface PublicStayLocation {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  nearbyAttractions?: string[];
}

