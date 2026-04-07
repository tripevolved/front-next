import { ApiRequest } from "@/services/api/request";

export type TripPriceResponse = {
  id: string;
  price: number;
  savings: number;
  hasError: boolean;
  errorMessage?: string | null;
};

/**
 * POST /trips/{tripId}/price
 */
export const postTripPrice = async (tripId: string): Promise<TripPriceResponse> => {
  const route = `trips/${tripId}/price`;
  return ApiRequest.post<TripPriceResponse>(route, {});
};

