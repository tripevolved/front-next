import { TripImage } from "@/core/types/trip";
import { ApiRequest } from "@/services/api/request";

export type TripAccommodationRoomItem = {
  rateId: string;
  roomId: string;
  name: string;
  description?: string | null;
  coverImage?: TripImage | null;
};

export type TripAccommodationItem = {
  uniqueName: string;
  id: string;
  name: string;
  fullAddress: string;
  coverImage?: TripImage | null;
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

