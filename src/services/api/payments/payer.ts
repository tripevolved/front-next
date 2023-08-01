import { TripPayer } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getPayerById = async (travelerId: string) => {
  const route = `payments/${travelerId}/payer`;
  const payer = await ApiRequest.get<TripPayer>(route);
  return payer;
};
