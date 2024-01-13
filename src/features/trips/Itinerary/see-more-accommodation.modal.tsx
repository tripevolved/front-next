import { Box, ErrorState, EmptyState } from "@/ui";

import { Grid, Skeleton } from "mars-ds";

import type { SeeMoreAccommodationProps } from "@/features";

import { AccommodationDetailModal } from "@/features";
import { StaysApiService } from "@/services/api";
import useSWR from "swr";

export function SeeMoreAccommodation({
  tripId,
  itineraryActionId,
  router,
  onCloseModal,
}: SeeMoreAccommodationProps) {
  const fetcher = async () => StaysApiService.getByTripId(tripId, itineraryActionId!);
  const { data: data, isLoading, error } = useSWR(`trip-stay-${tripId}`, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <StayDetailsLoadingState />;
  if (!data) return <EmptyState />;

  return (
    <AccommodationDetailModal
      data={data}
      tripId={tripId}
      itineraryActionId={itineraryActionId}
      router={router}
      onCloseModal={onCloseModal} />
  );
}

const StayDetailsLoadingState = () => (
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
