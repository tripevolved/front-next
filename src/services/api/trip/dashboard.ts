import { TripAbstract } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTripDetailsByIdForDashboard = async (tripId: string) => {
  const route = `trips/${tripId}/dashboard`;
  const tripAbstract = await ApiRequest.get<TripAbstract>(route);
  return tripAbstract;
};
