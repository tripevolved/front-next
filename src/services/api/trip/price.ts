import { TripPrice } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripPriceById = async (tripId: string): Promise<TripPrice> => {
  const route = `trips/${tripId}/price1`;
  const tripPrice = await ApiRequest.get<Omit<TripPrice, "total">>(route);
  const total = tripPrice.price + tripPrice.serviceFee;
  return { ...tripPrice, total };
};
