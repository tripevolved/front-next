import { AllTrips } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getAllByTravelerId = async (travelerId: string) => {
  const route = `trips/${travelerId}/all`;
  const allTrips = await ApiRequest.get<AllTrips>(route);
  return allTrips;
};
