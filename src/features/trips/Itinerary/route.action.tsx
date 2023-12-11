import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Accordion, Skeleton } from "mars-ds";
import { ErrorState, EmptyState } from "@/ui";
import { TripDetailInfo } from "../TripDetailsPage";
import useSWR from "swr";
import { TransportationApiService } from "@/services/api";
import { CarDetailInfo } from "../TripDetailsPage/trip-transportation.section";

export const RouteAction = (props: ItineraryActionProps & { tripId: string }) => {
  const fetcher = async () =>
    TransportationApiService.getTransportationActionItinerary(
      props.tripId,
      props.tripItineraryActionId
    );
  const { isLoading, data, error } = useSWR(
    `get-itinerary-route-action-${props.tripItineraryActionId}`,
    fetcher
  );

  if (error) return <ErrorState />;

  return (
    <Skeleton active={isLoading} height={230}>
      {data ? (
        <div className="pl-xl itinerary__item">
          <TripDetailInfo image={`/assets/destino/carro.svg`} title="Carro" />
          <CarDetailInfo data={data} />
        </div>
      ) : (
        <EmptyState />
      )}
    </Skeleton>
  );
};
