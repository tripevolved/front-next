import { TripStayRoom } from "@/core/types";
import type { TripStayRoomsListProps } from "./trip-stay-rooms-list.types";
import { TripStayRoomCard } from "@/features";
import { StaysApiService } from "@/services/api";
import { EmptyState, Text } from "@/ui";
import { Button, Loader, Notification } from "mars-ds";
import useSwr from "swr";
import { useState } from "react";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { useRouter } from "next/router";
import useTripStayRoomEdit from "./trip-stay-room-list.hook";

const roomsMock: TripStayRoom[] = [
  {
    coverImageUrl: "https://picsum.photos/300/200",
    details: { amenities: ["coisa", "nova", "teste"], information: "informação sensacional" },
    features: [
      { title: "Wifi", type: "wifi" },
      { title: "Ar Condicionado", type: "ac" },
      { title: "Boa cama", type: "bed" },
    ],
    id: "i2u3g429",
    isSelected: true,
    price: 20.0,
    subtitle: "Acomoda 2 pessoas",
    title: "Suíte simples",
  },
  {
    coverImageUrl: "https://picsum.photos/300/200",
    details: { amenities: ["coisa", "nova", "teste"], information: "informação sensacional" },
    features: [{ title: "Ar Condicionado", type: "ac" }],
    id: "ukajsytdi873",
    isSelected: true,
    price: 20.0,
    subtitle: "acomoda 4 pessoas",
    title: "Suíte deluxe",
  },
];
const ERROR_MESSAGE = "Erro ao enviar seus dados!";

export function TripStayRoomsList({ tripId }: TripStayRoomsListProps) {
  const [roomList, setRoomList] = useState<TripStayRoom[]>([]);
  const router = useRouter();

  const {
    transactionData,
    isLoading: isLoadingHook,
    error: errorHook,
    getTransactionData,
    sendData,
    errorSentData,
  } = useTripStayRoomEdit();

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
    // Transaction data to set the hotel rooms (uniqueTransactionId)
    getTransactionData(tripId);

    if (!transactionData && errorHook) return Notification.error(ERROR_MESSAGE);

    const totalPrice = roomList.reduce((acc, room) => acc + room.price, 0);
    const objDTO: TripHotelDTO = {
      uniqueTransactionId: transactionData.uniqueTransactionId,
      accommodations: [
        {
          id: hotelData?.id,
          code: hotelData?.code,
          signature: hotelData?.signature,
          provider: hotelData?.provider,
          system: hotelData!.system,
          rooms: [
            ...roomList.map((room) => ({
              id: room.id || "",
              code: room.code || "",
              signature: room.signature || "",
              provider: room.provider || "",
              unitPrice: room.price || 0,
              totalPrice: totalPrice || 0,
              currency: hotelData?.details.currency || "",
              boardChoice: "",
            })),
          ],
        },
      ],
    };

    sendData(tripId, objDTO);

    if (errorSentData) return Notification.error(ERROR_MESSAGE);

    Notification.success("Quartos selecionados com Sucesso!");
    router.push(`/app/viagens/criar/${tripId}`);
  };

  if (isLoading)
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Loader size="xs" />
      </div>
    );
  if (error) return <EmptyState />;
  if (!hotelData) return <EmptyState />;

  return (
    <div className="trip-stay-rooms-list gap-lg">
      <Text
        heading
        className="trip-stay-rooms-list__title"
        style={{ textAlign: "left", color: "var(--color-brand-1)", width: "100%" }}
      >
        Lista de quartos
      </Text>
      {roomsMock.map((room, index) => (
        <TripStayRoomCard onClick={() => handleSelect(room)} {...room} key={index} />
      ))}
      <Button
        className="trip-stay-rooms-list__confirm m-lg"
        disabled={roomList.length <= 0 || isLoadingHook}
        onClick={() => handleConfirm()}
      >
        Confirmar
      </Button>
      {isLoadingHook ? <Loader size="md" /> : null}
    </div>
  );
}
