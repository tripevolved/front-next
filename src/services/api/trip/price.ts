import { TripPrice } from "@/core/types";
import { ApiRequest } from "@/services/api/request";
import { MathHelper } from "@/utils/helpers/math.helper";

export const getTripPriceById = async (tripId: string): Promise<TripPrice> => {
  const route = `trips/${tripId}/price`;
  const tripPrice = await ApiRequest.get<Omit<TripPrice, "total">>(route);
  const total = MathHelper.sum(tripPrice.price, tripPrice.serviceFee);
  return { ...tripPrice, total };
};
