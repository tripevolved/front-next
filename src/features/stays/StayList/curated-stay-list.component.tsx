import { ErrorState, EmptyState } from "@/ui";

import { Grid, Skeleton } from "mars-ds";

import type { StayListProps } from "@/features";
import { StaysApiService } from "@/services/api";
import useSWR from "swr";
import { CuratedStayListItem } from "./curated-stay-list-item.component";

export function CuratedStayList({
  tripId,
  itineraryActionId
}: StayListProps) {
  const fetcher = async () => StaysApiService.getRecommendedStays(tripId, itineraryActionId);
  const { data, isLoading, error } = useSWR(
    `recommended-get-${tripId}-action-${itineraryActionId}`,
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
