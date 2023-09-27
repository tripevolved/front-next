import { TripStayRoom } from "@/core/types";
import type { TripStayRoomsListProps } from "./trip-stay-rooms-list.types";
import { TripStayRoomCard } from "@/features";
import { StaysApiService } from "@/services/api";
import { EmptyState, Text } from "@/ui";
import { Button, Loader } from "mars-ds";
import useSwr from "swr";

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
    id: "i2u3g429",
    isSelected: true,
    price: 20.0,
    subtitle: "acomoda 4 pessoas",
    title: "Suíte deluxe",
  },
];

export function TripStayRoomsList({ tripId }: TripStayRoomsListProps) {
  const fetcher = async () => StaysApiService.getByTripId(tripId);
  const { data, isLoading, error } = useSwr(`current-accomodation-${tripId}`, fetcher);

  if (isLoading)
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Loader size="xs" />
      </div>
    );
  if (error) return <EmptyState />;
  if (!data) return <EmptyState />;

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
        <TripStayRoomCard {...room} key={index} />
      ))}
      <Button className="trip-stay-rooms-list__confirm m-lg">Confirmar</Button>
    </div>
  );
}
