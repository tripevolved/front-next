import { AllTrips } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTrips = async () => {
  const allTrips = await ApiRequest.get<AllTrips>("/trips");
  return allTrips;
};

/** @deprecated Use getTrips instead. Kept for backward compatibility. */
export const getAllByTravelerId = async (travelerId: string, pastTrips: boolean) => {
  const route = `trips/${travelerId}/all?pastTrips=${pastTrips}`;
  const allTrips = await ApiRequest.get<AllTrips>(route);
  return allTrips;
};
