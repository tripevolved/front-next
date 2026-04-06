export interface PublicAccommodation {
  id: string;
  uniqueName: string;
  title: string;
  subtitle: string | null;
  destination: string;
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
  tags?: string[]; // e.g., ["5 estrelas", "Luxo"]
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
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface PublicAccommodationRoom {
  id: string;
  title: string;
  subtitle: string | null; // HTML content
  images: PublicAccommodationImage[];
  amenities: PublicAccommodationAmenity[];
}

export interface PublicAccommodationRoomRate {
  id: string;
  vendor: string;
  price: number;
  /** List price before discount; shown strikethrough when greater than `price` */
  originalPrice?: number;
  currency: string;
  cancellationPolicy: string;
  taxes?: {
    amount: number;
    /** Omitted or empty when unknown; still omit row when `amount` is 0 */
    description?: string | null;
  }[];
  hasBreakfast: boolean;
  hasHalfBoard?: boolean;
  hasFullBoard?: boolean;
  isAllInclusive?: boolean;
  isCancellable: boolean;
}

export interface PublicAccommodationRoomAvailability extends PublicAccommodationRoom {
  rates: PublicAccommodationRoomRate[];
}

export interface AccommodationAvailabilityResponse {
  transactionId: string;
  /** Instant until which `transactionId` / availability context remains valid (parsed from API datetime). */
  uniqueTransactionValidUntil?: Date;
  rooms: PublicAccommodationRoomAvailability[];
}

export interface AccommodationPropertyTax {
  amount: number;
  description?: string | null;
}

/** Item in `rateConditions` from POST /accommodations/availability/conditions */
export interface AccommodationRateConditionItem extends PublicAccommodationRoomRate {
  /** Rate id echoed in conditions payload (same as `id`) */
  roomRateId: string;

  priceHasChanged: boolean;
  isSpecialOffer: boolean;
  isNonRefundable: boolean;

  checkInTime?: string | null;
  checkOutTime?: string | null;
  bedDescription?: string | null;

  /** HTML with detailed info about room/accommodation/rate */
  moreInformation?: string | null;

  propertyTaxes?: AccommodationPropertyTax[];
}

/** Response from POST /accommodations/availability/conditions */
export interface AccommodationAvailabilityConditionsResponse {
  uniqueTransactionId: string;
  /** Instant until which `uniqueTransactionId` remains valid (parsed from API datetime). */
  uniqueTransactionValidUntil?: Date;
  rates: AccommodationRateConditionItem[];
}
