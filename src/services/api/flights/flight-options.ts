import { FlightOptions } from "@/core/types/flight-options";
import { ApiRequest } from "@/services/api/request";

export const getFlightOptions = async (tripId: string) => {
  let route = `transportations/${tripId}/flight-options`;

  const flightsOptions = await ApiRequest.get<FlightOptions[]>(route);
  return flightsOptions;
};

export const saveSelectFlightTransportations = async (tripId: string, body: FlightOptions) => {
  let route = `transportations/${tripId}/flight-transportations`;

  const normalizeFlight = (flight: FlightOptions) => {
    const originFlight = flight.flights.find(
      (flight2: { origin: { description: string } }) =>
        flight2.origin.description === flight.origin?.description
    );
  
    const destinationFlight = flight.flights.find(
      (flight2: { destination: { description: string } }) =>
        flight2.destination.description === flight.destination.description
    );
  
    const airlineIcon = flight.flights.find((flight: { iconUrl: string }) => flight.iconUrl)?.iconUrl;

    return {
      ...flight,
      companyIataCode: flight?.company?.iataCode,
      companyLogoUrl: airlineIcon,
      companyTrackerId: flight?.externalId,
      initialDestinationAirportIataCode: flight?.origin?.iataCode,
      finalDestinationAirportIataCode: flight?.destination?.iataCode,
      departure: originFlight?.departureDate,
      expectedArrival: destinationFlight?.arrivalDate,
      flights: flight?.flights?.map((f: any) => ({
        ...f,
        companyIataCode: flight?.company?.iataCode,
        fromAirportIataCode: flight?.origin?.iataCode ?? "",
        toAirportIataCode: flight?.destination?.iataCode ?? "",
        flightNumber: f?.number ?? "", 
      })) ?? [],
  }};

  const transformedBody = Array.isArray(body) 
    ? body.map(normalizeFlight) 
    : [normalizeFlight(body)];

  return await ApiRequest.put(route, transformedBody);
};
