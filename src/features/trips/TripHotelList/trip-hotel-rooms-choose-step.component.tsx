import type { TripStayRoom } from "@/core/types";
import { TripStayRoomCard } from "@/features";
import type { RoomsStep } from "./trip-hotel-list.types";
import { Text, Box } from "@/ui";
import { SubmitButton, Button as BackButton } from "mars-ds";
import { useState } from "react";

export const TripHotelRoomsChoose = ({ roomsList, onNext, isSubmitting }: RoomsStep) => {
  const [roomList, setRoomList] = useState<TripStayRoom[]>([]);

  const handleSelect = (value: TripStayRoom) => {
    const existsInRoomList = roomList.some((room) => room.id === value.id);

    if (existsInRoomList) {
      const updatedRoomList = roomList.filter((room) => room.id !== value.id);
      setRoomList(updatedRoomList);
    } else {
      setRoomList([...roomList, value]);
    }
  };

  return (
    <div className="trip-stay-rooms-list gap-lg">
      <Text heading className="trip-stay-rooms-list__title text-left w-100 color-text-secondary">
        Lista de quartos
      </Text>
      {roomsList.map((room, index) => (
        <TripStayRoomCard onClick={() => handleSelect(room)} {...room} key={index} />
      ))}
      <Box>
        <BackButton iconName="arrow-left" />
        <SubmitButton
          className="trip-stay-rooms-list__confirm m-lg"
          submitting={isSubmitting}
          disabled={roomList.length <= 0}
          onClick={() => onNext({ value: roomList, isAccommodation: false })}
        >
          Confirmar
        </SubmitButton>
      </Box>
    </div>
  );
};
