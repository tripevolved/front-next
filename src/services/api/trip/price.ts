import { TripPrice } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripPriceById = async (tripId: string) => {
  const route = `trips/${tripId}/price`;
  const tripPrice = await ApiRequest.get<TripPrice>(route).catch((error) => {
    console.log(error);
    return null;
  });
  return tripPrice;
};
