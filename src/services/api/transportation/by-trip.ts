import { TripTransportation } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTransportationByTripId = async (tripId: string) => {
  const route = `transportation/${tripId}`;
  const tripTransportation = await ApiRequest.get<TripTransportation>(route);
  return tripTransportation;
};
