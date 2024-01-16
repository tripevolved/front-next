import { ErrorState, EmptyState } from "@/ui";


import type { SeeMoreAccommodationProps } from "@/features";

import { StayDetailsLoadingState, StayDetailsModal } from "@/features";
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
    <StayDetailsModal
      tripStay={data}
      itineraryActionId={itineraryActionId}
      tripId={tripId}
      router={router}
      onCloseModal={onCloseModal}
    />
  );
}
