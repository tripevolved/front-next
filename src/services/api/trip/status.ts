import { ApiRequest } from "@/services/api/request";

export const getTripStatusById = async (tripId: string) => {
  const route = `trips/${tripId}/status`;
  const tripDetails = await ApiRequest.get<{ready: boolean}>(route);
  return tripDetails;
};
