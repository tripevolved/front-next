import { AllTrips } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export interface GetTripsQuery {
  fromDate?: string;
  toDate?: string;
}

export const getTrips = async (query?: GetTripsQuery) => {
  const sp = new URLSearchParams();
  if (query?.fromDate?.trim()) sp.set("fromDate", query.fromDate.trim());
  if (query?.toDate?.trim()) sp.set("toDate", query.toDate.trim());
  const qs = sp.toString();
  const path = qs ? `/trips?${qs}` : "/trips";
  const allTrips = await ApiRequest.get<AllTrips>(path);
  return allTrips;
};
