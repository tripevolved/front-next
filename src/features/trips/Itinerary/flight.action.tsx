import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { useState } from "react";
import { Accordion, Skeleton, Grid } from "mars-ds";
import { ErrorState, EmptyState, Picture } from "@/ui";
import { TripDetailInfo } from "../TripDetailsPage";
import useSWR from "swr";
import { TransportationApiService } from "@/services/api";
import { TripTransportationItem } from "../TripDetailsPage/trip-transportation.section";

export const FlightAction = (props: ItineraryActionProps & { tripId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fetcher = async () =>
    TransportationApiService.getTransportationActionItinerary(
      props.tripId,
      props.tripItineraryActionId
    );
  const { isLoading, data, error } = useSWR(
    isOpen ? `get-itinerary-flight-action-${props.tripItineraryActionId}` : null,
    fetcher
  );

  if (error) return <ErrorState />;

  return (
    <Accordion title={`⚫ ${props?.from.title}`} onClick={() => setIsOpen(true)}>
      <Skeleton active={isLoading}>
        {data ? (
          <div className="w-100 pl-xl ml-xs itinerary__item">
            <TripDetailInfo image={`/assets/destino/passagem-aerea.svg`} title="Passagem aérea" />
            <Grid columns={["56px", "1fr"]} className="mt-lg">
              <Picture src={data?.partnerLogoUrl || "/assets/blank-image.png"} />
              <Grid>
                <TripTransportationItem
                  title="Saída"
                  date={data?.departure}
                  name={data?.fromName}
                  address={data?.fromAddress}
                />
                <TripTransportationItem
                  title="Chegada prevista"
                  date={data?.estimatedArrival}
                  name={data?.toName}
                  address={data?.toAddress}
                />
              </Grid>
            </Grid>
          </div>
        ) : (
          <EmptyState />
        )}
      </Skeleton>
    </Accordion>
  );
};
