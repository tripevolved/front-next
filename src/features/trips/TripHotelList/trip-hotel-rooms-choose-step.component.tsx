import type { TripStayRoom } from "@/core/types";
import { TripStayRoomCard } from "@/features";
import type { RoomsStep } from "./trip-hotel-list.types";
import { Text, Box } from "@/ui";
import { SubmitButton, Button as BackButton } from "mars-ds";
import { useState } from "react";

export const TripHotelRoomsChoose = ({
  roomsList,
  onNext,
  isSubmitting,
  onPrevious,
  chosenRooms,
  setFunction,
}: RoomsStep) => {
  const handleSelect = (newRooms: TripStayRoom) => {
    const existsInRoomList = chosenRooms.some((room) => room.code === newRooms.code);

    if (existsInRoomList) {
      const updatedRoomList = chosenRooms.filter((room) => room.code !== newRooms.code);
      setFunction(updatedRoomList);
    } else {
      setFunction([...chosenRooms, newRooms]);
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
      <Box className="flex align-items-center">
        <div>
          <BackButton
            iconName="arrow-left"
            className="p-sm"
            variant="secondary"
            onClick={() => onPrevious!()}
          />
        </div>
        <SubmitButton
          className="trip-stay-rooms-list__confirm m-lg"
          submitting={isSubmitting}
          disabled={chosenRooms.length <= 0}
          onClick={() => onNext()}
        >
          Confirmar
        </SubmitButton>
      </Box>
    </div>
  );
};
