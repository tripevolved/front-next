import { ApiRequest } from "@/services/api/request";

export interface TripTravelerInput {
  id?: string | null;
  travelerId?: string | null;
  roomIndex: number;
  name: string;
  lastName: string;
  rg?: string | null;
  rgValidUntil?: string | null;
  rgIssuer?: string | null;
  cpf: string;
  email?: string | null;
  gender?: string | null;
  /** ISO date string (YYYY-MM-DD) */
  birthDate: string;
}

export interface SetTripTravelersRequest {
  tripId: string;
  travelers: TripTravelerInput[];
}

/**
 * POST /trips/{tripId}/travelers
 */
export const postTripTravelers = async (tripId: string, body: SetTripTravelersRequest): Promise<void> => {
  const route = `trips/${tripId}/travelers`;
  await ApiRequest.post(route, body);
};

/**
 * GET /trips/{tripId}/travelers
 * Returns the same model used by POST.
 */
export const getTripTravelers = async (tripId: string): Promise<SetTripTravelersRequest> => {
  const route = `trips/${tripId}/travelers`;
  return ApiRequest.get<SetTripTravelersRequest>(route);
};

