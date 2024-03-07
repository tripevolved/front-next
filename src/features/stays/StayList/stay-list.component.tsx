import { Box, Text, Picture, HoverTooltipCard, ErrorState, EmptyState } from "@/ui";

import { Button, Divider, Grid, Skeleton } from "mars-ds";

import type { StayDetailsModalProps, StayListProps } from "@/features";

import { Carousel } from "@/ui";
import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { StaysApiService } from "@/services/api";
import useSWR from "swr";
import { CuratedStayListItem } from "./curated-stay-list-item.component";

const EMPTY_INFO_DETAILS = "-";

export function StayList({
  tripId,
  itineraryActionId
}: StayListProps) {
  const fetcher = async () => StaysApiService.getRecommendedStays(tripId, itineraryActionId);
  const { data, isLoading, error } = useSWR(
    `accommodation-get-${tripId}-action-${itineraryActionId}`,
    fetcher
  );

  if (error) return <ErrorState />;

  return (
    <Skeleton active={isLoading} height={170}>
      {data ? (
        <Grid>
          {data.map((curatedStay, index) => {
            return (<div key={index}>
              <CuratedStayListItem curatedStay={curatedStay} />
            </div>);
          })}
        </Grid>
      ) : (
        <EmptyState />
      )}
    </Skeleton>
  );
}

const StayListLoadingState = () => (
  <Box className="flex-column w-100 gap-lg">
    <Skeleton active width={"60%"} height={20} />
    <Skeleton active width={"40%"} style={{ marginBottom: 15 }} />
    <Skeleton active width={"100%"} height={350} />
    <Skeleton active width={"30%"} height={20} style={{ marginBottom: 15 }} />
    <Grid className="w-100">
      <Skeleton active width={"100%"} />
      <Skeleton active width={"100%"} />
      <Skeleton active width={"100%"} />
    </Grid>
    <Skeleton active width={"30%"} />
    <Skeleton active width={"30%"} />
  </Box>
);
