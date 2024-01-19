import { AllTrips } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getAllByTravelerId = async (travelerId: string, pastTrips: boolean) => {
  const route = `trips/${travelerId}/all?pastTrips=${pastTrips}`;
  const allTrips = await ApiRequest.get<AllTrips>(route);
  return allTrips;
};
