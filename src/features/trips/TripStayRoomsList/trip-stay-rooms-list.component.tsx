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
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const fetcher = async () => StaysApiService.getByTripId(tripId);
  const { data: hotelData, isLoading, error } = useSwr(`current-accomodation-${tripId}`, fetcher);

  const getTransactionData = async () => StaysApiService.getHotels(tripId);

  const handleConfirm = () => {
    setLoad(true);
    const { data: transactionData, error: errorGetTransactionData } = useSwr(
      `accommodation-get-${tripId}`,
      getTransactionData
    );

    if (errorGetTransactionData) return Notification.error(ERROR_MESSAGE);

    const objDTO: TripHotelDTO = {
      uniqueTransactionId: transactionData?.uniqueTransactionId!,
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
              totalPrice: room.price || 0,
              currency: hotelData?.details.currency || "",
              boardChoice: "",
            })),
          ],
        },
      ],
    };

    const sendData = async () => StaysApiService.setStay(tripId, objDTO);
    const { error: errorSentData } = useSwr(`accomodation-set-${tripId}`, sendData);

    if (errorSentData) return Notification.error(ERROR_MESSAGE);

    Notification.success("Quartos selecionados com Sucesso!");

    router.push(`/app/viagens/criar/${tripId}`);
  };

  const handleSelect = (value: TripStayRoom) => {
    const existsInRoomList = roomList.some((room) => room.id === value.id);

    if (existsInRoomList) {
      const updatedRoomList = roomList.filter((room) => room.id !== value.id);
      setRoomList(updatedRoomList);
    } else {
      setRoomList([...roomList, value]);
    }
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
        disabled={roomList.length <= 0 || load}
        onClick={() => handleConfirm()}
      >
        Confirmar
      </Button>
      {load ? <Loader size="md" /> : null}
    </div>
  );
}
