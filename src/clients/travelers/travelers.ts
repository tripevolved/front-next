import { ApiRequest } from "@/services/api/request";

export interface CreateTravelerDTO {
  name: string;
  phone: string;
}

export const createTraveler = async (data: CreateTravelerDTO): Promise<void> => {
  const route = `travelers`;
  await ApiRequest.post(route, data);
};

export interface TripTravelerInput {
  id?: string | null;
  travelerId?: string | null;
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
 * POST /travelers/trips/{tripId}
 */
export const setTripTravelers = async (
  tripId: string,
  body: SetTripTravelersRequest
): Promise<void> => {
  const route = `travelers/trips/${tripId}`;
  await ApiRequest.post(route, body);
};

