import { TripItinerary } from "@/core/types/itinerary";
import { ApiRequest } from "@/services/api/request";

export const getItinerary = async (tripId: string) => {
  const route = `/trips/${tripId}/itinerary`;
  const tripItinerary = await ApiRequest.get<TripItinerary>(route);
  return tripItinerary;
};
