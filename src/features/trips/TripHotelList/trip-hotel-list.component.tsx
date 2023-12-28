import { Box, EmptyState, ErrorState, GlobalLoader, StepsLoader, Text } from "@/ui";
import type { TripHotelListProps } from "./trip-hotel-list.types";

import type { TripStay, TripStayRoom } from "@/core/types";

import { useState } from "react";
import { StaysApiService } from "@/services/api";
import useSwr from "swr";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { TripHotelChoose } from "./trip-hotel-choose-step.component";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { TripHotelRoomsChoose } from "./trip-hotel-rooms-choose-step.component";
import { useTripHotelEdit } from "./trip-hotel-list.hook";
import { Notification } from "mars-ds";
import { useRouter } from "next/router";
import { useAppStore } from "@/core/store";

const EDIT_STEPS = [
  {
    title: "Lista de Hotéis",
    name: "hotelSelection",
    component: TripHotelChoose,
  },
  {
    title: "Escolha os quartos",
    name: "roomsSelection",
    component: TripHotelRoomsChoose,
  },
];

const LOADING_STEPS = [
  {
    text: "Reconstruindo sua viagem...",
    iconName: "settings",
  },
  {
    text: "Procurando atrações para seu roteiro...",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];
const FIFTEEN_SECONDS_IN_MS = 15 * 1000;
const MILLISECONDS = FIFTEEN_SECONDS_IN_MS;

const DEFAULT_INITIAL_INDEX = 0;

export function TripHotelList({ tripId }: TripHotelListProps) {
  const [tripHotel, setTripHotel] = useState<TripStay>();
  const [tripHotelRooms, setTripHotelRooms] = useState<TripStayRoom[]>([]);

  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);

  const router = useRouter();
  const currentAccommodation = useAppStore((state) => state.accommodation);
  const animation = useAnimation();
  const { isLoadingSentData, errorSentData, canSendTD, setCanSendTD, setObjDTO } =
    useTripHotelEdit(tripId);

  const fetcher = async () =>
    StaysApiService.getHotels(tripId, currentAccommodation.itineraryActionId!);
  const { data, isLoading, error } = useSwr(`accomodation-get-${tripId}`, fetcher);

  const handleBack = () => {
    setCurrentIndex(currentIndex - 1);
    animation.trigger(true);
  };

  const handleSubmit = () => {
    const roomsSumPrice = tripHotelRooms.reduce((acc, room) => acc + room.price, 0);

    const objDTO: TripHotelDTO = {
      uniqueTransactionId: data!.uniqueTransactionId,
      tripItineraryActionId: currentAccommodation.itineraryActionId!,
      accommodations: [
        {
          id: tripHotel?.id,
          code: tripHotel?.code,
          signature: tripHotel?.signature,
          provider: tripHotel?.provider,
          system: tripHotel!.system,
          rooms: tripHotelRooms.map((room) => ({
            id: room.id || "",
            code: room.code || "",
            signature: room.signature || "",
            provider: room.provider || "",
            unitPrice: room.price || 0,
            totalPrice: Number(roomsSumPrice.toFixed(2)),
            currency: room.currency || "",
            boardChoice: room.boardChoice || "RO",
          })),
        },
      ],
    };

    setObjDTO(objDTO);
    setCanSendTD(true);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < EDIT_STEPS.length) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      handleSubmit();
    }
  };

  const handleFinish = () => {
    router.push(`/app/viagens/${tripId}/detalhes`);
  };

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  if (isLoadingSentData || canSendTD) {
    return (
      <div style={{ width: "100%", height: 500, display: "flex", alignItems: "center" }}>
        <StepsLoader steps={LOADING_STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
      </div>
    );
  }

  return (
    <div className="trip-hotel-list">
      <Text heading style={{ color: "var(--color-brand-1)" }} size="sm">
        {EDIT_STEPS[currentIndex].title}
      </Text>
      <Box style={animation.style}>
        {currentIndex == 0 ? (
          <TripHotelChoose hotelLists={data} onNext={handleNext} setFunction={setTripHotel} />
        ) : tripHotel ? (
          <TripHotelRoomsChoose
            roomsList={tripHotel?.details.rooms}
            onNext={handleNext}
            isSubmitting={isLoadingSentData}
            onPrevious={handleBack}
            setFunction={setTripHotelRooms}
            chosenRooms={tripHotelRooms}
          />
        ) : null}
      </Box>
    </div>
  );
}
