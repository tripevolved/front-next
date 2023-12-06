import { EmptyState, ErrorState, Text } from "@/ui";
import type { ItineraryProps } from "./itinerary.types";

import { Card, CardElevations, Skeleton } from "mars-ds";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";
import { RentalCarAction } from "./rental-car.action";
import { FlightAction } from "./flight.action";
import { RouteAction } from "./route.action";
import { AccommodationAction } from "./accommodation.action";

export function Itinerary({ tripId }: ItineraryProps) {
  const fetcher = async () => TripsApiService.getItinerary(tripId);
  const { data, isLoading, error } = useSWR(`get-trip-itinerary-${tripId}`, fetcher);

  if (error) return <ErrorState />;
  if (data?.actions.length == 0) return <EmptyState />;

  return (
    <Card className="itinerary flex-column gap-lg" elevation={CardElevations.Low}>
      <Text heading size="lg">
        Seu itinerário
      </Text>
      <Text>
        Analisando suas informações, construímos um itinerário a partir de sua casa até Ouro Preto,
        para que você só tenha o trabalho de curtir sua viagem. MAIS XALAIÁ...
      </Text>
      <Skeleton active={isLoading}>
        {data?.actions.length
          ? data?.actions.map((action, i) => {
              if (!action.from.title) {
                const from = {
                  title: "Destino!",
                  latitude: action.from.latitude,
                  longitude: action.from.longitude,
                };
                action = { ...action, from };
              }

              return action.type == "RENTAL_CAR" ? (
                <RentalCarAction {...action} key={`${i}-${action.tripItineraryActionId}`} />
              ) : action.type == "FLIGHT" ? (
                <FlightAction
                  {...action}
                  tripId={tripId}
                  key={`${i}-${action.tripItineraryActionId}`}
                />
              ) : action.type == "ROUTE" ? (
                <RouteAction
                  {...action}
                  tripId={tripId}
                  key={`${i}-${action.tripItineraryActionId}`}
                />
              ) : action.type == "ACCOMMODATION" ? (
                <AccommodationAction
                  {...action}
                  tripId={tripId}
                  key={`${i}-${action.tripItineraryActionId}`}
                />
              ) : null;
            })
          : null}
      </Skeleton>
    </Card>
  );
}
