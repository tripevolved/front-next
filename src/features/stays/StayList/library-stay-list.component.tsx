import { ErrorState, EmptyState } from "@/ui";

import { Grid, Skeleton } from "mars-ds";

import type { StayListProps } from "@/features";
import { StaysApiService } from "@/services/api";
import useSWR from "swr";
import { LibraryStayListItem } from "./library-stay-list-item.component";

export function LibraryStayList({ tripId, itineraryActionId }: StayListProps) {
  const fetcher = async () => StaysApiService.getLibraryStays(tripId, itineraryActionId);
  const { data, isLoading, error } = useSWR(
    `library-${tripId}-action-${itineraryActionId}`,
    fetcher
  );

  if (error) return <ErrorState />;

  return (
    <Skeleton active={isLoading} height={170}>
      {data ? (
        <Grid>
          {data.map((stay, index) => {
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
