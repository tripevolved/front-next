import { AllTrips } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTrips = async () => {
  const allTrips = await ApiRequest.get<AllTrips>("/trips");
  return allTrips;
};
