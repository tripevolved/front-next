import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Skeleton, Grid, Modal, Button, Label, LabelVariants } from "mars-ds";
import { ErrorState, EmptyState, Picture, Text, CardHighlight, GlobalLoader } from "@/ui";
import useSWR from "swr";
import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";

import { StayEditionButton } from "../TripDetailsPage/trip-stay.section";
import { TripStayHighlightSection } from "../TripDetailsPage/trip-stay-highlight.section";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { AccommodationState } from "@/core/store/accomodation";
import { AccommodationDetailModal } from "@/features";

export const AccommodationAction = (props: ItineraryActionProps & { tripId: string }) => {
  const router = useRouter();

  const fetcher = async () =>
    StaysApiService.getByTripId(props.tripId, props.tripItineraryActionId);
  const { isLoading, data, error } = useSWR(
    `get-itinerary-accommodation-action-${props.tripItineraryActionId}`,
    fetcher
  );

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

  const handleSeeDetails = () => {
    const modal = Modal.open(
      () => (
        <AccommodationDetailModal
          data={data}
          tripId={props.tripId}
          itineraryActionId={props.tripItineraryActionId}
          router={router}
          onCloseModal={() => modal.close()}
        />
      ),
      {
        closable: true,
        size: "md",
      }
    );
  };

  return (
    <Skeleton active={isLoading} height={355}>
      {data ? (
        <Grid className="pl-lg">
          <Grid columns={["25%", "auto"]}>
            <Picture className="accommodation-action_image">
              {data.coverImage ? parsePhoto(data.coverImage) : "/assets/blank-image.png"}
            </Picture>
            <div>
              <div className="w-100 flex-column itinerary-item__content__break">
                <div>
                  <Text as="h3" size="lg">
                    {data.name}
                  </Text>
                  <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{data.tags}</Text>
                  {data.cancellationInfo && <Label variant={LabelVariants.Info}>{data.cancellationInfo}</Label>}
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
      href: `/app/viagens/${tripId}/hospedagem/editar/?idItinerario=${tripItineraryActionId}`,
      label: "Escolher hospedagem",
      iconName: "arrow-right",
      isRtl: true,
    }}
  />
);
