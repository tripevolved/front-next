import { ErrorState, EmptyState, Picture } from "@/ui";
import { Text } from "@/ui";

import { Button, Grid, Loader, Notification, Skeleton } from "mars-ds";

import type { StayListProps } from "@/features";
import { StaysApiService } from "@/services/api";
import useSWR from "swr";
import { LibraryStayListItem } from "./library-stay-list-item.component";
import { useCallback, useEffect, useState } from "react";
import { UpdateTripStay } from "@/services/api/stays/by-trip";
import { useRouter } from "next/router";

export function LibraryStayList({ tripId, itineraryActionId }: StayListProps) {
  const hotelsFetcher = async () => StaysApiService.getHotels(tripId, itineraryActionId);
  const stayFetcher = async () => StaysApiService.getByTripId(tripId, itineraryActionId);
  const {
    data: hotelsData,
    isLoading: isLoadingHotels,
    error: errorFetchingHotels,
  } = useSWR(`recommended-${tripId}-action-${itineraryActionId}`, hotelsFetcher, {
    revalidateOnFocus: false,
  });
  const {
    data: stayData,
    isLoading: isLoadingStay,
    error: errorFetchingStay,
  } = useSWR(`stay-${tripId}-${itineraryActionId}`, stayFetcher, { revalidateOnFocus: false });
  const [selectedStayId, setSelectedStayId] = useState<string>();
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (stayData === undefined) {
      return;
    }
    // TODO: get id of current stay
  }, [stayData]);

  useEffect(() => {
    if (selectedStayId === undefined) {
      return;
    }
    const selectedStay = [...(hotelsData?.curated ?? []), ...(hotelsData?.others ?? [])].find(
      ({ id }) => id === selectedStayId
    );
    if (selectedStay === undefined || selectedStay.details.rooms.length === 0) {
      return;
    }
    const selectedRoom = selectedStay.details.rooms.find(({ isSelected }) => isSelected);
    if (selectedRoom !== undefined) {
      setSelectedRoomCode(selectedRoom.code);
      return;
    }
    setSelectedRoomCode(selectedStay.details.rooms[0].code);
  }, [selectedStayId, hotelsData?.curated, hotelsData?.others]);

  const handleSave = useCallback(async () => {
    try {
      setIsLoading(true);
      if (hotelsData === undefined) {
        throw "missing data";
      }
      const stay = (hotelsData?.curated ?? [])
        .concat(hotelsData?.others ?? [])
        .find(({ id }) => id === selectedStayId);
      if (!stay) {
        throw "missing stay";
      }
      const room = stay?.details.rooms.find(({ code }) => code === selectedRoomCode);
      if (!room) {
        throw "missing room";
      }
      const payload: UpdateTripStay = {
        uniqueTransactionId: hotelsData.uniqueTransactionId,
        accommodations: [
          {
            accomodationId: stay.id,
            code: stay.code!,
            provider: stay.provider!,
            signature: stay.signature!,
            system: stay.system,
            tripItineraryActionId: itineraryActionId,
            rooms: [
              {
                id: room.id,
                code: room.code!,
                boardChoice: room.boardChoice!,
                currency: room.currency!,
                provider: room.provider!,
                signature: room.signature!,
                totalPrice: room.price,
                unitPrice: room.price,
              },
            ],
          },
        ],
      };
      await StaysApiService.putTripStay(tripId, payload);
      setIsLoading(false);
      router.back();
    } catch (err: any) {
      Notification.error(err.message)
    }
  }, [
    tripId,
    itineraryActionId,
    selectedRoomCode,
    selectedStayId,
    hotelsData,
    setIsLoading,
    setError,
    router,
  ]);

  if (errorFetchingHotels) return <ErrorState />;
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div>
          <Text as="h2" size="lg" style={{ color: "var(--color-brand-1" }}>
            <strong>Listagem de hoteis</strong>
          </Text>
          <Text as="h3" size="sm" className="flex flex-row gap-sm mb-md">
            <Picture src="/assets/stays/stay_recommended.svg"></Picture>
            <span>Com selo Trip Evolved</span>
          </Text>
        </div>
        <div>
          <Button disabled={isLoading || isLoadingHotels} onClick={handleSave}>
            {isLoading || isLoadingHotels ? <Loader /> : "Salvar"}
          </Button>
        </div>
      </div>

      <Skeleton active={isLoadingHotels} height={170}>
        {hotelsData !== undefined && (hotelsData.curated ?? []).length > 0 ? (
          <Grid>
            {hotelsData.curated?.map((stay) => {
              return (
                <LibraryStayListItem
                  key={stay.id}
                  tripId={tripId}
                  stay={stay}
                  isRecommended={true}
                  selected={selectedStayId === stay.id}
                  selectedRoomCode={selectedRoomCode}
                  setSelectedRoom={setSelectedRoomCode}
                  setSelected={() => setSelectedStayId(stay.id)}
                />
              );
            })}
            {hotelsData.others?.map((stay) => {
              return (
                <LibraryStayListItem
                  key={stay.id}
                  tripId={tripId}
                  stay={stay}
                  isRecommended={false}
                  selectedRoomCode={selectedRoomCode}
                  setSelectedRoom={setSelectedRoomCode}
                  selected={stay.id === selectedStayId}
                  setSelected={() => setSelectedStayId(stay.id)}
                />
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
