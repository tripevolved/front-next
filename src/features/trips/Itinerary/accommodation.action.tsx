import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { useState } from "react";
import { Accordion, Skeleton, Grid } from "mars-ds";
import { ErrorState, EmptyState, Picture, Text } from "@/ui";
import { TripDetailInfo } from "../TripDetailsPage";
import useSWR from "swr";
import { StaysApiService } from "@/services/api";

export const AccommodationAction = (props: ItineraryActionProps & { tripId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fetcher = async () =>
    StaysApiService.getAccommodationItineraryAction(props.tripId, props.tripItineraryActionId);
  const { isLoading, data, error } = useSWR(
    isOpen ? `get-itinerary-accommodation-action-${props.tripItineraryActionId}` : null,
    fetcher
  );

  if (error) return <ErrorState />;

  return (
    <Accordion title={props?.from.title} onClick={() => setIsOpen(true)}>
      <Skeleton active={isLoading}>
        {data ? (
          <div className="w-100 pl-xl">
            <TripDetailInfo image={`/assets/itinerario/hospedagem.svg`} title="Hospedagem" />
            <Grid className="mt-lg">
              <Grid columns={["56px", "auto"]}>
                <Picture src={data.coverImageUrl || "/assets/blank-image.png"} />
                <div>
                  <Text as="h3" size="lg">
                    {data.name}
                  </Text>
                  <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{data.tags}</Text>
                  {!data.isRoomSelected ? <Text size="sm">{data.roomSelectionMessage}</Text> : null}
                </div>
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
