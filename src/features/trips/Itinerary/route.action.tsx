import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Card, Label, Skeleton } from "mars-ds";
import { ErrorState, EmptyState, CardHighlight, Text } from "@/ui";
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
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error) return <ErrorState />;

  return (
    <Skeleton active={isLoading} height={230}>
      {data ? (
        <div className="pl-xl itinerary__item">
          {props.type == "TRANSFER" ? (
            <Card>
              <Text size="xl">
                Incluímos o transfer de <strong>{data.fromName}</strong> a{" "}
                <strong>{data.toName}</strong> para você.
              </Text>
            </Card>
          ) : (
            <></>
          )}
          <CarDetailInfo data={data} />
        </div>
      ) : (
        <EmptyState />
      )}
    </Skeleton>
  );
};
