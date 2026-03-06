import { ItineraryList } from "@/core/types/itinerary";
import { ApiRequest } from "@/services/api/request";

export const getItinerary = async (tripId: string) => {
  const route = `/trips/${tripId}/itinerary`;
  const tripItinerary = await ApiRequest.get<ItineraryList>(route);
  return tripItinerary;
};
