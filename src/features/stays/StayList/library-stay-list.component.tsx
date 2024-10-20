import { ErrorState, EmptyState } from "@/ui";
import { Text } from "@/ui";

import { Grid, Skeleton } from "mars-ds";

import type { StayListProps } from "@/features";
import { StaysApiService } from "@/services/api";
import useSWR from "swr";
import { LibraryStayListItem } from "./library-stay-list-item.component";
import { useEffect, useState } from "react";

export function LibraryStayList({ tripId, itineraryActionId }: StayListProps) {
  const hotelsFetcher = async () => StaysApiService.getHotels(tripId, itineraryActionId);
  const {
    data: hotelsData,
    isLoading: isLoadingHotels,
    error: errorFetchingHotels,
  } = useSWR(`recommended-${tripId}-action-${itineraryActionId}`, hotelsFetcher, {
    revalidateOnFocus: false,
  });
  const [selectedStay, setSelectedStay] = useState<string>();
  useEffect(() => {
    const stay = hotelsData?.others
      ?.concat(hotelsData.curated)
      .find(({ isSelected }) => isSelected);
    if (stay) {
      setSelectedStay(stay.id);
    }
  }, [hotelsData]);
  if (errorFetchingHotels) return <ErrorState />;

  return (
    <>
      <Text as="h2" size="lg" style={{ color: "var(--color-brand-1" }}>
        <strong>Listagem de hoteis</strong>
      </Text>
      <Skeleton active={isLoadingHotels} height={170}>
        {hotelsData !== undefined && hotelsData.curated.length > 0 ? (
          <Grid>
            {hotelsData.curated?.map((stay, index) => {
              return (
                <div key={index}>
                  <LibraryStayListItem
                    stay={stay}
                    isRecommended={true}
                    selected={stay.id === selectedStay}
                    setSelected={() => setSelectedStay(stay.id)}
                  />
                </div>
              );
            })}
            {hotelsData.others?.map((stay, index) => {
              return (
                <div key={index}>
                  <LibraryStayListItem
                    stay={stay}
                    isRecommended={false}
                    selected={stay.id === selectedStay}
                    setSelected={() => setSelectedStay(stay.id)}
                  />
                </div>
              );
            })}
          </Grid>
        ) : (
          <EmptyState />
        )}
      </Skeleton>
    </>
  );
}
