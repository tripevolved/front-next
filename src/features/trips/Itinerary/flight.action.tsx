import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Skeleton, Grid, Modal, Button } from "mars-ds";
import { ErrorState, EmptyState, GlobalLoader, CardHighlight } from "@/ui";
import useSWR from "swr";
import { TransportationApiService } from "@/services/api";
import { FlightBox, FlightDetailsPainel } from "@/features";
import { TripTransportation } from "@/core/types";

export const FlightAction = (props: ItineraryActionProps & { tripId: string }) => {
  const fetcher = async () =>
    TransportationApiService.getTransportationActionItinerary(
      props.tripId,
      props.tripItineraryActionId
    );
  const { isLoading, data, error } = useSWR(
    `get-itinerary-flight-action-${props.tripItineraryActionId}`,
    fetcher
  );

  const handleSeeDetails = () => {
    Modal.open(() => <FlightDetailsPainel transportationData={data!} isModalView />, {
      size: "md",
      closable: true,
    });
  };

  const getFlight = (data: TripTransportation) => {
    const fromCode = data.fromName?.split("-")[0].trim();
    const outboundFlight =
      data.flightView.outboundFlight.flightDetails.find(
        (item) => item.fromAirportCode === fromCode
      ) || null;

    const returnFlight =
      data.flightView.returnFlight.flightDetails.find(
        (item) => item.fromAirportCode === fromCode
      ) || null;

    return outboundFlight || returnFlight;
  };

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader inline />;

  return (
    <Skeleton active={isLoading} height={170}>
      <div className="pl-xl itinerary__item">
        {data ? (
          <Grid>
            {data.flightView !== null ? (
              <>
                <FlightBox {...getFlight(data)!} hideTitle />
                <Button
                  variant="neutral"
                  size="sm"
                  onClick={() => handleSeeDetails()}
                  style={{ width: "fit-content" }}
                >
                  Ver detalhes
                </Button>
              </>
            ) : (
              <CardHighlight
                variant="warning"
                heading="Ainda não escolhemos o voo para sua viagem"
                text="Fale conosco e vamos deixar te ajudar!"
              />
            )}
          </Grid>
        ) : (
          <EmptyState />
        )}
      </div>
    </Skeleton>
  );
};
