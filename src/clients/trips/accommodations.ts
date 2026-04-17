import { TripImage } from "@/core/types/trip";
import { ApiRequest } from "@/services/api/request";

export type TripAccommodationRoomItem = {
  rateId: string;
  roomId: string;
  name: string;
  description?: string | null;
  coverImage?: TripImage | null;
  adults?: number | null;
  children?: number | null;
};

export type TripAccommodationItem = {
  uniqueName: string;
  id: string;
  name: string;
  fullAddress: string;
  coverImage?: TripImage | null;
  tags?: string[] | null;
  recommendedFor?: string[] | null;
  /** Trip/accommodation stay start date (often date-only ISO). */
  startDate?: string | Date | null;
  /** Trip/accommodation stay end date (often date-only ISO). */
  endDate?: string | Date | null;
  uniqueTransactionId?: string | null;
  /** Backend datetime; treated as optional in UI when missing. */
  uniqueTransactionIdValidUntil: Date | null;
  vendor: string;
  rooms: TripAccommodationRoomItem[];
};

export const getTripAccommodations = async (tripId: string): Promise<TripAccommodationItem[]> => {
  const route = `trips/${tripId}/accommodations`;
  return ApiRequest.get<TripAccommodationItem[]>(route);
};

export const getTripAccommodationById = async (
  tripId: string,
  accommodationId: string
): Promise<TripAccommodationItem> => {
  const route = `trips/${tripId}/accommodations/${accommodationId}`;
  return ApiRequest.get<TripAccommodationItem>(route);
};

/**
 * POST /trips/{tripId}/accommodations/{tripAccommodationId}/bookings — pre-book (no body).
 */
export const postTripAccommodationBookings = async (
  tripId: string,
  tripAccommodationId: string
): Promise<unknown> => {
  const route = `trips/${tripId}/accommodations/${tripAccommodationId}/bookings`;
  return ApiRequest.post<unknown>(route, undefined);
};

