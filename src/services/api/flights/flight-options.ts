import { FlightOptions } from "@/core/types/flight-options";
import { ApiRequest } from "@/services/api/request";

export const getFlightOptions = async (tripId: string) => {
  let route = `transportations/${tripId}/flight-options`;

  const flightsOptions = await ApiRequest.get<FlightOptions[]>(route);
  return flightsOptions;
};
