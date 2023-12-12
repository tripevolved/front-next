import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Skeleton, Grid, Modal, Button, Icon } from "mars-ds";
import { ErrorState, EmptyState, Picture } from "@/ui";
import { TripDetailInfo } from "../TripDetailsPage";
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
      data.flightView.outboundFlight.fromAirportCode === fromCode
        ? data.flightView.outboundFlight.flightDetails[0]
        : null;
    const returnFlight =
      data.flightView.returnFlight.fromAirportCode === fromCode
        ? data.flightView.returnFlight.flightDetails[0]
        : null;

    return outboundFlight || returnFlight;
  };

  if (error) return <ErrorState />;

  return (
    <Skeleton active={isLoading} height={170}>
      <div className="pl-xl itinerary__item">
        {data ? (
          <>
            <TripDetailInfo image={`/assets/destino/passagem-aerea.svg`} title="Passagem aérea" />
            <Grid columns={["45px", "auto"]} className="my-lg">
              <Picture src={data?.partnerLogoUrl || "/assets/blank-image.png"} />
              <Grid>
                <FlightBox {...getFlight(data)!} hideTitle />
                <Button
                  variant="neutral"
                  size="sm"
                  onClick={() => handleSeeDetails()}
                  style={{ width: "fit-content" }}
                >
                  Ver detalhes
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </Skeleton>
  );
};
