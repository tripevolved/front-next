import { TripDetails } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripDetailsById = async (tripId: string) => {
  const route = `trips/${tripId}`;
  const tripDetails = await ApiRequest.get<TripDetails>(route);
  return tripDetails;
};
