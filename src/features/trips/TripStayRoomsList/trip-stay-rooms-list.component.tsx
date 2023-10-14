import { TripStayRoom } from "@/core/types";
import type { TripStayRoomsListProps } from "./trip-stay-rooms-list.types";
import { TripStayRoomCard } from "@/features";
import { EmptyState, StepsLoader, Text } from "@/ui";
import { SubmitButton, Notification } from "mars-ds";
import { useState } from "react";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { useRouter } from "next/router";
import useTripStayRoomEdit from "./trip-stay-room-list.hook";
import { useAppStore } from "@/core/store";
import { AccommodationState } from "@/core/store/accomodation";

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
const FIFTEEN_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = FIFTEEN_SECONDS_IN_MS;

export function TripStayRoomsList({ tripId }: TripStayRoomsListProps) {
  const [roomList, setRoomList] = useState<TripStayRoom[]>([]);
  const router = useRouter();

  const {
    setObjDTO,
    setCanSendPayload,
    canSendPayload,

    isLoadingSentData,
    errorSentData,
  } = useTripStayRoomEdit(tripId);

  // Current hotel data
  // const fetcher = async () => StaysApiService.getByTripId(tripId);
  // const { data: hotelData, isLoading, error } = useSwr(`current-accomodation-${tripId}`, fetcher);
  const hotelData = useAppStore((state) => state.accommodation);

  const doesObjHaveRooms = (object: AccommodationState): boolean => {
    if (!object.details?.rooms.length) return false;

    return true;
  };

  const handleSelect = (value: TripStayRoom) => {
    const existsInRoomList = roomList.some(
      (room) =>
        room.id === value.id || room.code === value.code || room.signature === value.signature
    );

    if (existsInRoomList) {
      const updatedRoomList = roomList.filter(
        (room) =>
          room.id !== value.id || room.code !== value.code || room.signature !== value.signature
      );
      setRoomList(updatedRoomList);
    } else {
      setRoomList([...roomList, value]);
    }
  };

  const handleConfirm = () => {
    const roomsSumPrice = roomList.reduce((acc, room) => acc + room.price, 0);

    const objDTO: TripHotelDTO = {
      uniqueTransactionId: hotelData.uniqueTransactionId!,
      accommodations: [
        {
          id: hotelData?.id,
          code: hotelData?.code,
          signature: hotelData?.signature,
          provider: hotelData?.provider,
          system: hotelData!.system!,
          rooms: roomList.map((room) => ({
            id: room.id || "",
            code: room.code || "",
            signature: room.signature || "",
            provider: room.provider || "",
            unitPrice: room.price || 0,
            totalPrice: roomsSumPrice,
            currency: hotelData?.details?.currency || "",
            boardChoice: room.boardChoice || "RO",
          })),
        },
      ],
    };

    setObjDTO(objDTO);
    setCanSendPayload(true);
  };

  if (!doesObjHaveRooms(hotelData)) return <EmptyState />;

  const handleFinish = () => {
    if (errorSentData)
      return Notification.error(
        "Tivemos um problema ao enviar suas informações! Aguarde e Tente novamente"
      );
    Notification.success("Quartos reservados com Sucesso!");
    router.push(`/app/viagens/criar/${tripId}`);
  };

  if (isLoadingSentData || canSendPayload) {
    return (
      <div style={{ width: "100%", height: 500, display: "flex", alignItems: "center" }}>
        <StepsLoader steps={LOADING_STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
      </div>
    );
  }

  return (
    <div className="trip-stay-rooms-list gap-lg">
      <Text heading className="trip-stay-rooms-list__title text-left w-100 color-text-secondary">
        Lista de quartos
      </Text>
      {hotelData?.details?.rooms.map((room, index) => (
        <TripStayRoomCard onClick={() => handleSelect(room)} {...room} key={index} />
      ))}
      <SubmitButton
        className="trip-stay-rooms-list__confirm m-lg"
        disabled={roomList.length <= 0}
        submitting={isLoadingSentData}
        onClick={() => handleConfirm()}
      >
        Confirmar
      </SubmitButton>
    </div>
  );
}
