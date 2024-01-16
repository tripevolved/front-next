import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Skeleton, Grid, Modal, Button, Card } from "mars-ds";
import { ErrorState, EmptyState, Picture, Text, CardHighlight, GlobalLoader } from "@/ui";
import useSWR from "swr";
import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";

import { StayEditionButton } from "../TripDetailsPage/trip-stay.section";
import { TripStayHighlightSection } from "../TripDetailsPage/trip-stay-highlight.section";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { AccommodationState } from "@/core/store/accomodation";
import { TripStay } from "@/core/types";
import { StayDetailsModal } from "@/features/stays/StayDetailsModal";

export const AccommodationAction = (props: ItineraryActionProps & { tripId: string }) => {
  const router = useRouter();

  const fetcher = async () =>
    StaysApiService.getByTripId(props.tripId, props.tripItineraryActionId);
  const { isLoading, data, error } = useSWR(
    `get-itinerary-accommodation-action-${props.tripItineraryActionId}`,
    fetcher
  );

  const handleSeeDetails = (tripStay: TripStay) => {
    const modal = Modal.open(
      () => (
        <StayDetailsModal
          tripId={props.tripId}
          itineraryActionId={props.tripItineraryActionId}
          router={router}
          onCloseModal={() => modal.close()}
          tripStay={tripStay}
        />
      ),
      {
        closable: true,
        size: "md",
      }
    );
  };

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader inline />;

  if (!data || !data.isSelected) {
    return (
      <>
        <div className="px-xl w-100 flex-column gap-lg">
          <TripStayEmptyState
            tripId={props.tripId}
            tripItineraryActionId={props.tripItineraryActionId}
          />
        </div>
      </>
    );
  }

  if (!data.isRoomSelected) {
    return (
      <>
        <div className="px-xl w-100 flex-column gap-lg">
          <TripStayEmptyRoomState
            tripId={props.tripId}
            tripItineraryActionId={props.tripItineraryActionId}
            tripStay={data}
            handleSeeDetails={() => handleSeeDetails(data)}
          />
        </div>
      </>
    );
  }

  return (
    <Skeleton active={isLoading} height={355}>
      {data ? (
        <Grid className="pl-lg">
          <Grid columns={["96px", "auto"]}>
            <Picture>
              {data.coverImage ? parsePhoto(data.coverImage) : "/assets/blank-image.png"}
            </Picture>
            <div>
              <div className="w-100 flex-column itinerary-item__content__break">
                <div>
                  <Text as="h3" size="lg">
                    {data.name}
                  </Text>
                  <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{data.tags}</Text>
                </div>
                <StayEditionButton
                  tripId={props.tripId}
                  itineraryActionId={props.tripItineraryActionId}
                  accommodationData={data as AccommodationState}
                />
              </div>
              {!data.isRoomSelected ? <Text size="sm">{data.roomSelectionMessage}</Text> : null}
              <Button className="mt-sm" size="sm" variant="neutral" onClick={() => handleSeeDetails(data)}>
                Ver detalhes
              </Button>
            </div>
          </Grid>
          {data.highlight ? <TripStayHighlightSection highlight={data.highlight} /> : null}
        </Grid>
      ) : (
        <EmptyState />
      )}
    </Skeleton>
  );
};

const TripStayEmptyState = ({ tripId = "", tripItineraryActionId = "" }) => (
  <CardHighlight
    variant="warning"
    heading="Ainda não escolhemos a acomodação para sua viagem"
    text="Fale conosco e vamos deixar tudo como você deseja!"
    cta={{
      href: `/app/viagens/${tripId}/hospedagem/editar/?iditinerario=${tripItineraryActionId}`,
      label: "Escolher hospedagem",
      iconName: "arrow-right",
      isRtl: true,
    }}
  />
);

interface TripStayEmptyRoomStateProps {
  tripId: string;
  tripItineraryActionId: string;
  tripStay: TripStay;
  handleSeeDetails: () => void;
}

const TripStayEmptyRoomState = ({ tripId = "", tripItineraryActionId = "", tripStay, handleSeeDetails }: TripStayEmptyRoomStateProps) => {
  return (
    <Card className={"card-highlight card-highlight--warning"}>
      <Text as="h3" heading size="xs" className="mb-md">
        <strong>Temos uma sugestão de hospedagem</strong>
      </Text>
      <Text className="color-text-secondary mb-md">{tripStay.roomSelectionMessage}</Text>
      <Grid columns={["56px", "auto", "25%"]} style={{padding: "8px 0 12px 0"}}>
        <Picture>
          {tripStay.coverImage ? parsePhoto(tripStay.coverImage) : "/assets/blank-image.png"}
        </Picture>
        <div>
          <div className="w-100 flex-column itinerary-item__content__break">
            <div>
              <Text as="h3" size="lg">
                {tripStay.name}
              </Text>
              <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{tripStay.tags}</Text>
            </div>
          </div>
        </div>
        <Button className="mt-sm" size="sm" variant="neutral" onClick={handleSeeDetails}>
          Ver detalhes
        </Button>
      </Grid>
      <div>
        <Button 
          variant="neutral"
          size="sm"
          href={`/app/viagens/${tripId}/hospedagem/editar/?iditinerario=${tripItineraryActionId}`}
          label="Escolher outra hospedagem online"
          iconName="arrow-right"
          isRtl={true} />
      </div>
    </Card>
  );
}
