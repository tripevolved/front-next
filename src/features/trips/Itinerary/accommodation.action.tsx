import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { useState } from "react";
import { Accordion, Skeleton, Grid, Modal, Button } from "mars-ds";
import { ErrorState, EmptyState, Picture, Text } from "@/ui";
import { TripDetailInfo } from "@/features";
import useSWR from "swr";
import { StaysApiService } from "@/services/api";
import { TripStayDetails } from "@/features";
import { useRouter } from "next/router";

import { StayEditionButton } from "../TripDetailsPage/trip-stay.section";
import { TripStayHighlightSection } from "../TripDetailsPage/trip-stay-highlight.section";

export const AccommodationAction = (props: ItineraryActionProps & { tripId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const fetcher = async () =>
    StaysApiService.getAccommodationItineraryAction(props.tripId, props.tripItineraryActionId);
  const { isLoading, data, error } = useSWR(
    isOpen ? `get-itinerary-accommodation-action-${props.tripItineraryActionId}` : null,
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

  return (
    <Accordion
      title={`🌑 ${props?.from.title || data?.name || ""}`}
      onClick={() => setIsOpen(true)}
    >
      <Skeleton active={isLoading} height={170}>
        {data ? (
          <div className="w-100 pl-xl itinerary__item" style={{ marginLeft: 6 }}>
            <Grid columns={["1fr", "auto"]}>
              <TripDetailInfo image={`/assets/destino/hospedagem.svg`} title="Hospedagem" />
              <StayEditionButton tripId={props.tripId} />
            </Grid>
            {/* <TripDetailInfo image={`/assets/destino/hospedagem.svg`} title="Hospedagem" /> */}
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
    </Accordion>
  );
};
