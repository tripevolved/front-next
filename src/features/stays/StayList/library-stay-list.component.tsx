import { ErrorState, EmptyState, Picture } from "@/ui";
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
  const [selectedStayId, setSelectedStayId] = useState<string>();
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>();

  useEffect(() => {
    if (hotelsData === undefined) {
      setSelectedStayId(undefined);
      return;
    }
    const stay = (hotelsData?.others ?? [])
      ?.concat(hotelsData?.curated ?? [])
      .find(({ isSelected }) => isSelected);
    if (stay) {
      setSelectedStayId(stay.id);
    } else {
      if (hotelsData.curated !== undefined && hotelsData.curated.length > 0) {
        setSelectedStayId(hotelsData.curated[0].id);
      } else if (hotelsData.others !== undefined && hotelsData.others.length > 0) {
        setSelectedStayId(hotelsData.others[0].id);
      } else {
        setSelectedStayId(undefined);
      }
    }
  }, [hotelsData]);

  useEffect(() => {
    if (selectedStayId === undefined) {
      return;
    }
    const stay = [...(hotelsData?.curated ?? []), ...(hotelsData?.others ?? [])].find(
      ({ id }) => id === selectedStayId
    );
    if (stay === undefined || stay.details.rooms.length === 0) {
      return;
    }
    const selectedRoom = stay.details.rooms.find(({ isSelected }) => isSelected);
    if (selectedRoom !== undefined) {
      setSelectedRoomCode(selectedRoom.code);
      return;
    }
    setSelectedRoomCode(stay.details.rooms[0].code);
  }, [selectedStayId, hotelsData?.curated, hotelsData?.others]);

  if (errorFetchingHotels) return <ErrorState />;

  return (
    <>
      <Text as="h2" size="lg" style={{ color: "var(--color-brand-1" }}>
        <strong>Listagem de hoteis</strong>
      </Text>
      <Text as="h3" size="sm" className="flex flex-row gap-sm mb-md">
        <Picture src="/assets/stays/stay_recommended.svg"></Picture>
        <span>Com selo Trip Evolved</span>
      </Text>
      <Skeleton active={isLoadingHotels} height={170}>
        {hotelsData !== undefined && (hotelsData.curated ?? []).length > 0 ? (
          <Grid>
            {hotelsData.curated?.map((stay) => {
              return (
                <div key={stay.id}>
                  <LibraryStayListItem
                    tripId={tripId}
                    stay={stay}
                    isRecommended={true}
                    selected={selectedStayId === stay.id}
                    selectedRoomCode={
                      stay.details.rooms.find(({ code }) => code === selectedRoomCode)?.code
                    }
                    setSelectedRoom={setSelectedRoomCode}
                    setSelected={() => setSelectedStayId(stay.id)}
                  />
                </div>
              );
            })}
            {hotelsData.others?.map((stay) => {
              return (
                <div key={stay.id}>
                  <LibraryStayListItem
                    tripId={tripId}
                    stay={stay}
                    isRecommended={false}
                    selectedRoomCode={
                      stay.details.rooms.find(({ code }) => code === selectedRoomCode)?.code
                    }
                    setSelectedRoom={setSelectedRoomCode}
                    selected={stay.id === selectedStayId}
                    setSelected={() => setSelectedStayId(stay.id)}
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
