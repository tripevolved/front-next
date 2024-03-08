import { TripPrice } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripPriceById = async (tripId: string): Promise<TripPrice> => {
  const route = `trips/${tripId}/price`;
  const tripPrice = await ApiRequest.post<TripPrice>(route, null);
  return tripPrice;
};
