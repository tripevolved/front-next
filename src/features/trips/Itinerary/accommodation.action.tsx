import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Accordion, Skeleton, Grid, Modal, Button } from "mars-ds";
import { ErrorState, EmptyState, Picture, Text, CardHighlight } from "@/ui";
import { TripDetailInfo } from "@/features";
import useSWR from "swr";
import { StaysApiService } from "@/services/api";
import { TripStayDetails } from "@/features";
import { useRouter } from "next/router";

import { StayEditionButton } from "../TripDetailsPage/trip-stay.section";
import { TripStayHighlightSection } from "../TripDetailsPage/trip-stay-highlight.section";

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

  if (!data || !data.isSelected) {
    return (
      <>
        <TripDetailInfo image={`/assets/destino/hospedagem.svg`} title="Hospedagem" />
        <TripStayEmptyState tripId={props.tripId} />
      </>
    );
  }

  return (
    <Skeleton active={isLoading} height={355}>
      {data ? (
        <div className="pl-xl itinerary__item">
          <Grid columns={["1fr", "auto"]}>
            <TripDetailInfo image={`/assets/destino/hospedagem.svg`} title="Hospedagem" />
            <StayEditionButton tripId={props.tripId} />
          </Grid>
          <Grid className="mt-lg">
            <Grid columns={["56px", "auto"]}>
              <Picture src={data.coverImageUrl || "/assets/blank-image.png"} />
              <div>
                <Text as="h3" size="lg">
                  {data.name}
                </Text>
                <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{data.tags}</Text>
                {!data.isRoomSelected ? <Text size="sm">{data.roomSelectionMessage}</Text> : null}
                <Button className="mt-sm" size="sm" variant="neutral" onClick={handleSeeDetails}>
                  Ver detalhes
                </Button>
              </div>
            </Grid>
            {data.highlight ? <TripStayHighlightSection highlight={data.highlight} /> : null}
          </Grid>
        </div>
      ) : (
        <EmptyState />
      )}
    </Skeleton>
  );
};

const TripStayEmptyState = ({ tripId = "" }) => (
  <CardHighlight
    variant="warning"
    heading="Ainda não escolhemos a acomodação para sua viagem"
    text="Fale conosco e vamos deixar tudo como você deseja!"
    cta={{
      href: `/app/viagens/${tripId}/hospedagem/editar`,
      label: "Escolher hospedagem",
      iconName: "arrow-right",
      isRtl: true,
    }}
  />
);
