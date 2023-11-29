import { EmptyState, ErrorState, Text } from "@/ui";
import type { ItineraryProps } from "./itinerary.types";

import { Card, CardElevations, Skeleton } from "mars-ds";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";
import { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

export function Itinerary({ tripId }: ItineraryProps) {
  const fetcher = async () => TripsApiService.getItinerary(tripId);
  const { data, isLoading, error } = useSWR(`get-trip-itinerary-${tripId}`, fetcher);

  if (error) return <ErrorState />;
  if (data?.actions.length == 0) return <EmptyState />;

  return (
    <Card className="itinerary" elevation={CardElevations.Low}>
      <Text heading size="lg">
        Seu itinerário
      </Text>
      <Text>
        Analisando suas informações, construímos um itinerário a partir de sua casa até Ouro Preto,
        para que você só tenha o trabalho de curtir sua viagem. MAIS XALAIÁ...
      </Text>
      {data?.actions.length
        ? data?.actions.map((action, i) => (
            <ItineraryAction {...action} key={`${i}-${action.tripItineraryActionId}`} />
          ))
        : null}
    </Card>
  );
}

export const ItineraryAction = (props: ItineraryActionProps) => {
  return <div></div>;
};
