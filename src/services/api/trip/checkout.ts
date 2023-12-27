import { Checkout } from "@/core/types/";
import { ApiRequest } from "@/services/api/request";

export const getCheckoutById = async (tripId: string) => {
  const route = `/trips/${tripId}/checkout`;
  const tripCheckout = await ApiRequest.get<Checkout>(route);
  return tripCheckout;
};
