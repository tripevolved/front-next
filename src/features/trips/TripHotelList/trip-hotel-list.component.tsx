import { Box, EmptyState, ErrorState, GlobalLoader, Text } from "@/ui";
import type { TripHotelListProps } from "./trip-hotel-list.types";

import type { TripHotelList, TripStay, TripStayRoom } from "@/core/types";

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

const EDIT_STEPS = [
  {
    title: "Lista de Hoteis",
    name: "hotelSelection",
    component: TripHotelChoose,
  },
  {
    title: "Escolha os quartos",
    name: "roomsSelection",
    component: TripHotelRoomsChoose,
  },
];

const DEFAULT_INITIAL_INDEX = 0;

export function TripHotelList({ tripId }: TripHotelListProps) {
  const [tripHotel, setTripHotel] = useState<TripStay>();
  const [tripHotelRooms, setTripHotelRooms] = useState<TripStayRoom[]>([]);

  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);

  const router = useRouter();
  const animation = useAnimation();
  const { isLoadingSentData, errorSentData, setCanSendTD, setObjDTO } = useTripHotelEdit(tripId);

  const fetcher = async () => StaysApiService.getHotels(tripId);
  const { data, isLoading, error } = useSwr(`accomodation-get-${tripId}`, fetcher);

  const handleSubmit = () => {
    let totalPrice = 0;

    const roomsSumPrice = tripHotelRooms.reduce((acc, room) => acc + room.price, 0);

    if (tripHotel?.details.price) totalPrice = roomsSumPrice + tripHotel.details.price;
    else totalPrice = roomsSumPrice;

    const objDTO: TripHotelDTO = {
      uniqueTransactionId: data!.uniqueTransactionId,
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
            totalPrice: totalPrice,
            currency: tripHotel?.details.currency || "",
            boardChoice: "",
          })),
        },
      ],
    };

    setObjDTO(objDTO);
    setCanSendTD(true);

    if (errorSentData) return Notification.error("Tivemos um problema ao enviar suas informações!");

    Notification.success("Quartos selecionados com Sucesso!");
    router.push(`/app/viagens/criar/${tripId}`);
  };

  const handleNext = ({ value, isAccommodation }: { value: any; isAccommodation: boolean }) => {
    if (isAccommodation) {
      setTripHotel(value as TripStay);
    } else {
      setTripHotelRooms(value as TripStayRoom[]);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < EDIT_STEPS.length) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      handleSubmit();
    }
  };

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  return (
    <div className="trip-hotel-list">
      <Text heading style={{ color: "var(--color-brand-1)" }} size="sm">
        {EDIT_STEPS[currentIndex].title}
      </Text>
      <Box style={animation.style}>
        {currentIndex == 0 ? (
          <TripHotelChoose hotelLists={data} onNext={handleNext} />
        ) : tripHotel ? (
          <TripHotelRoomsChoose
            roomsList={tripHotel?.details.rooms}
            onNext={handleNext}
            isSubmitting={isLoadingSentData}
          />
        ) : null}
      </Box>
    </div>
  );
}
