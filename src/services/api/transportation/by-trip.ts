import { TripTransportation } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTransportationByTripId = async (tripId: string) => {
  const route = `transportations/${tripId}`;
  const tripTransportation = await ApiRequest.get<TripTransportation>(route);
  return tripTransportation;
};

export const getTransportationActionItinerary = async (
  tripId: string,
  itineraryActionId: string
) => {
  const route = `transportations/${tripId}?tripItineraryActionId=${itineraryActionId}`;
  const transportationActionItinerary = await ApiRequest.get<TripTransportation>(route);
  return transportationActionItinerary;
};
