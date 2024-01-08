import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Skeleton, Grid, Modal, Button } from "mars-ds";
import { ErrorState, EmptyState, Picture, Text, CardHighlight, GlobalLoader } from "@/ui";
import useSWR from "swr";
import { StaysApiService } from "@/services/api";
import { TripStayDetails } from "@/features";
import { useRouter } from "next/router";

import { StayEditionButton } from "../TripDetailsPage/trip-stay.section";
import { TripStayHighlightSection } from "../TripDetailsPage/trip-stay-highlight.section";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { AccommodationState } from "@/core/store/accomodation";

export const AccommodationAction = (props: ItineraryActionProps & { tripId: string }) => {
  const router = useRouter();

  const fetcher = async () =>
    StaysApiService.getAccommodationItineraryAction(props.tripId, props.tripItineraryActionId);
  const { isLoading, data, error } = useSWR(
    `get-itinerary-accommodation-action-${props.tripItineraryActionId}`,
    fetcher
  );

  const handleSeeDetails = () => {
    const modal = Modal.open(
      () => (
        <TripStayDetails
          stayData={data!}
          tripId={props.tripId}
          router={router}
          onCloseModal={() => modal.close()}
        />
      ),
      {
        closable: true,
        size: "lg",
      }
    );
  };

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader inline />;

  if (!data || !data.isSelected) {
    return (
      <>
        <div className="px-xl w-100 flex-column gap-lg">
          <TripStayEmptyState tripId={props.tripId} tripItineraryActionId={props.tripItineraryActionId} />
        </div>
      </>
    );
  }

  return (
    <Skeleton active={isLoading} height={355}>
      {data ? (
        <Grid className="pl-lg">
          <Grid columns={["96px", "auto"]}>
            <Picture>{data.coverImage ? parsePhoto(data.coverImage) : "/assets/blank-image.png"}</Picture>
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
              <Button className="mt-sm" size="sm" variant="neutral" onClick={handleSeeDetails}>
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
