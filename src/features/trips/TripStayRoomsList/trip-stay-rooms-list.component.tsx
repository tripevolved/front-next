import { TripStayRoom } from "@/core/types";
import type { TripStayRoomsListProps } from "./trip-stay-rooms-list.types";
import { TripStayRoomCard } from "@/features";
import { StaysApiService } from "@/services/api";
import { EmptyState, ErrorState, GlobalLoader, Text } from "@/ui";
import { Button, SubmitButton, Loader, Notification } from "mars-ds";
import useSwr from "swr";
import { useState } from "react";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { useRouter } from "next/router";
import useTripStayRoomEdit from "./trip-stay-room-list.hook";

const ERROR_MESSAGE = "Erro ao enviar seus dados!";

export function TripStayRoomsList({ tripId }: TripStayRoomsListProps) {
  const [roomList, setRoomList] = useState<TripStayRoom[]>([]);
  const router = useRouter();

  const {
    setCanGetTD,
    isLoadingTD,
    transactionData,
    errorTD,

    setObjDTO,
    setCanSendTD,

    isLoadingSentData,
    errorSentData,
  } = useTripStayRoomEdit(tripId);

  // Current hotel data
  const fetcher = async () => StaysApiService.getByTripId(tripId);
  const { data: hotelData, isLoading, error } = useSwr(`current-accomodation-${tripId}`, fetcher);

  const handleSelect = (value: TripStayRoom) => {
    const existsInRoomList = roomList.some((room) => room.id === value.id);

    if (existsInRoomList) {
      const updatedRoomList = roomList.filter((room) => room.id !== value.id);
      setRoomList(updatedRoomList);
    } else {
      setRoomList([...roomList, value]);
    }
  };

  const handleConfirm = () => {
    let totalPrice = 0;
    // Transaction data to set the hotel rooms (uniqueTransactionId)
    setCanGetTD(true);

    if (!transactionData || errorTD) return Notification.error(ERROR_MESSAGE);

    const roomsSumPrice = roomList.reduce((acc, room) => acc + room.price, 0);

    if (hotelData?.details.price) totalPrice = roomsSumPrice + hotelData.details.price;
    else totalPrice = roomsSumPrice;

    const objDTO: TripHotelDTO = {
      uniqueTransactionId: transactionData.uniqueTransactionId,
      accommodations: [
        {
          id: hotelData?.id,
          code: hotelData?.code,
          signature: hotelData?.signature,
          provider: hotelData?.provider,
          system: hotelData!.system,
          rooms: roomList.map((room) => ({
            id: room.id || "",
            code: room.code || "",
            signature: room.signature || "",
            provider: room.provider || "",
            unitPrice: room.price || 0,
            totalPrice: totalPrice,
            currency: hotelData?.details.currency || "",
            boardChoice: "",
          })),
        },
      ],
    };

    setObjDTO(objDTO);
    setCanSendTD(true);

    if (errorSentData) return Notification.error(ERROR_MESSAGE);

    Notification.success("Quartos selecionados com Sucesso!");
    router.push(`/app/viagens/criar/${tripId}`);
  };

  if (isLoading) return <GlobalLoader />;
  if (error) return <ErrorState />;
  if (!hotelData) return <EmptyState />;

  return (
    <div className="trip-stay-rooms-list gap-lg">
      <Text heading className="trip-stay-rooms-list__title text-left w-100 color-text-secondary">
        Lista de quartos
      </Text>
      {hotelData.details.rooms.map((room, index) => (
        <TripStayRoomCard onClick={() => handleSelect(room)} {...room} key={index} />
      ))}
      <SubmitButton
        className="trip-stay-rooms-list__confirm m-lg"
        disabled={roomList.length <= 0}
        submitting={isLoadingTD || isLoadingSentData}
        onClick={() => handleConfirm()}
      >
        Confirmar
      </SubmitButton>
    </div>
  );
}
