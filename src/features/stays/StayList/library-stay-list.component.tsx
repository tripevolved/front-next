import { ErrorState, EmptyState } from "@/ui";
import { Text } from "@/ui";

import { Grid, Skeleton } from "mars-ds";

import type { StayListProps } from "@/features";
import { StaysApiService } from "@/services/api";
import useSWR from "swr";
import { LibraryStayListItem } from "./library-stay-list-item.component";

export function LibraryStayList({ tripId, itineraryActionId }: StayListProps) {
  const fetcherLibrary = async () => StaysApiService.getLibraryStays(tripId, itineraryActionId);
  const { data, isLoading, error } = useSWR(
    `library-${tripId}-action-${itineraryActionId}`,
    fetcherLibrary
  );
  const fetcherRecommended = async () =>
    StaysApiService.getRecommendedStays(tripId, itineraryActionId);
  const {
    data: dataRecommended,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useSWR(`recommended-${tripId}-action-${itineraryActionId}`, fetcherRecommended);

  if (error) return <ErrorState />;

  return (
    <Skeleton active={isLoading} height={170}>
      <Text as="h2" size="lg" style={{ color: "var(--color-brand-1" }}>
        <strong>Listagem de hoteis</strong>
      </Text>
      {(data !== undefined && data?.length > 0) ||
      (dataRecommended !== undefined && dataRecommended.length > 0) ? (
        <Grid>
          {dataRecommended?.map((stay, index) => {
            return (
              <div key={index}>
                <LibraryStayListItem stay={stay} isRecommended={true} />
              </div>
            );
          })}
          {data?.map((stay, index) => {
            return (
              <div key={index}>
                <LibraryStayListItem stay={stay} />
              </div>
            );
          })}
        </Grid>
      ) : (
        <EmptyState />
      )}
    </Skeleton>
  );
}
