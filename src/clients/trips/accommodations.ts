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
  /** Total amount for this accommodation (when provided by backend). */
  amount?: number | null;
  /** Savings amount (commissions avoided) for this accommodation (when provided by backend). */
  savings?: number | null;
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

export type TripAccommodationDetailsResponse = {
  id: string;
  uniqueName: string;
  name: string;
  fullAddress: string;
  phone?: string | null;
  checkInDate?: Date | null;
  checkInHour?: string | null;
  checkOutDate?: Date | null;
  checkOutHour?: string | null;
  vendor?: string | null;
  coverImage?: TripImage | null;
  rooms: Array<{
    id: string;
    boardDescription?: string | null;
    name: string;
    description?: string | null;
    coverImage?: TripImage | null;
    travelers?: Array<{
      name: string;
      age?: number | null;
      document?: string | null;
    }> | null;
    propertyTaxes?: Array<{
      description?: string | null;
      amount: number;
      currency?: string | null;
    }> | null;
    cancellationPolicies?: Array<{
      amount: number;
      currency?: string | null;
      startDate: string | Date;
    }> | null;
    reservation?: {
      supplierId?: string | null;
      issueDate?: Date | null;
      paymentDate?: Date | null;
      number?: string | null;
      status?: string | null;
      paymentStatus?: "PAID" | "NOT_PAID" | null;
      remarks?: string | null;
    } | null;
  }>;
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

export const getTripAccommodationReservation = async (
  tripId: string,
  accommodationId: string
): Promise<TripAccommodationDetailsResponse> => {
  const route = `trips/${tripId}/accommodations/${accommodationId}/reservations`;
  return ApiRequest.get<TripAccommodationDetailsResponse>(route);
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

