import { TripItinerary } from "@/core/types/itinerary";
import { ApiRequest } from "@/services/api/request";

export const getItinerary = async (tripId: string) => {
  const route = `/trips/${tripId}/itinerary`;
  return ApiRequest.get<TripItinerary>(route);
};

export const createItinerary = async (tripId: string) => {
  const route = `/trips/${tripId}/itinerary`;
  return ApiRequest.post<TripItinerary>(route, {});
};
