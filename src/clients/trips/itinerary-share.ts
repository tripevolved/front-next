import type { ItineraryShareResponse, PublicTripItinerary } from "@/core/types/public-itinerary";
import { ApiRequest } from "@/services/api/request";

export const postItineraryShare = async (tripId: string): Promise<ItineraryShareResponse> => {
  const route = `/trips/${tripId}/itinerary/share`;
  return ApiRequest.post<ItineraryShareResponse>(route, {});
};

export const getPublicItinerary = async (shareToken: string): Promise<PublicTripItinerary> => {
  const route = `/trips/${shareToken}/itinerary/public`;
  return ApiRequest.get<PublicTripItinerary>(route);
};
