import { TripStayListCuratedItem } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getRecommendedStays = async (tripId: string, tripItineraryActionId: string, offset?: number, limit?: number) => {
  let route = `stays/${tripId}/recommended/${tripItineraryActionId}`;
  
  if (offset && limit) route += `?offset=${offset}&limit=${limit}`;
  else if (offset) route += `?offset=${offset}`;
  else if (limit) route += `?limit=${limit}`;
  
  const tripStay = await ApiRequest.get<TripStayListCuratedItem[]>(route);
  return tripStay;
};