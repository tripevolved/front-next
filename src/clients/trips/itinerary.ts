import { TripItinerary } from "@/core/types/itinerary";
import { ApiRequest } from "@/services/api/request";

export const getItinerary = async (tripId: string) => {
  const route = `/trips/${tripId}/itinerary`;
  return ApiRequest.get<TripItinerary>(route);
};

/** Returns `null` when the API responds with 204 No Content (no itinerary yet). */
export const getItineraryIfPresent = async (tripId: string): Promise<TripItinerary | null> => {
  const route = `/trips/${tripId}/itinerary`;
  return ApiRequest.get<TripItinerary | null>(route, { allowNoContent: true });
};

export const createItinerary = async (tripId: string) => {
  const route = `/trips/${tripId}/itinerary`;
  return ApiRequest.post<TripItinerary>(route, {});
};
