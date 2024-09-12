import { ItineraryList, ItineraryListV2 } from "@/core/types/itinerary";
import { ApiRequest } from "@/services/api/request";

export const getItinerary = async (tripId: string) => {
  const route = `/trips/${tripId}/itinerary`;
  const tripItinerary = await ApiRequest.get<ItineraryList>(route);
  const tripItineraryv2 = await ApiRequest.get<unknown>(`v2/trips/${tripId}/itinerary`);
  console.log(JSON.stringify(tripItineraryv2))
  return tripItinerary;
};

export const getItineraryV2 = async(tripId: string): Promise<ItineraryListV2> => {
  return ApiRequest.get<ItineraryListV2>(`v2/trips/${tripId}/itinerary`);
}
