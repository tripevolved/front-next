import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { useState } from "react";
import { Accordion, Skeleton } from "mars-ds";
import { ErrorState, EmptyState } from "@/ui";
import { TripDetailInfo } from "../TripDetailsPage";
import useSWR from "swr";
import { TransportationApiService } from "@/services/api";
import { CarDetailInfo } from "../TripDetailsPage/trip-transportation.section";

export const RouteAction = (props: ItineraryActionProps & { tripId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fetcher = async () =>
    TransportationApiService.getTransportationActionItinerary(
      props.tripId,
      props.tripItineraryActionId
    );
  const { isLoading, data, error } = useSWR(
    isOpen ? `get-itinerary-route-action-${props.tripItineraryActionId}` : null,
    fetcher
  );

  if (error) return <ErrorState />;

  return (
    <Accordion title={`🌑 ${props?.from.title || data?.fromName}`} onClick={() => setIsOpen(true)}>
      <Skeleton active={isLoading} height={170}>
        {data ? (
          <div className="w-100 pl-xl itinerary__item" style={{ marginLeft: 6 }}>
            <TripDetailInfo image={`/assets/destino/carro.svg`} title="Carro" />
            <CarDetailInfo data={data} />
          </div>
        ) : (
          <EmptyState />
        )}
      </Skeleton>
    </Accordion>
  );
};
