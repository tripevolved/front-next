import { Box, Text, Picture, ThumbnailCarousel } from "@/ui";

import { Button, Divider } from "mars-ds";

import type { StayDetailsModalProps } from "@/features";

import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { StayDetailsItem } from "./stay-details-item.component";
import { useState } from "react";

const EMPTY_INFO_DETAILS = "-";

export function StayDetailsEditModal({
  tripStay,
  selectedRoom: initialSelectedRoom,
  setSelectedRoom: updateSelectedRoom,
}: StayDetailsModalProps) {
  const [selectedRoomInit, setSelectedRoom] = useState(initialSelectedRoom);

  console.log(Boolean(selectedRoomInit));

  return (
    <div className="trip-stay-details">
      <Box className="trip-stay-details__initial-info">
        <div className="trip-stay-details__initial-info__header">
          <Text size="sm" heading className="trip-stay-details__initial-info__header__title">
            {tripStay.name}
          </Text>
          <Text>{tripStay.tags}</Text>
        </div>
        {tripStay.details.images?.length ? (
          <ThumbnailCarousel options={{}} slides={tripStay.details.images} />
        ) : tripStay.coverImage ? (
          <Picture className="trip-stay-details__initial-info__image" alt={tripStay.name}>
            {parsePhoto(tripStay.coverImage)}
          </Picture>
        ) : (
          <Picture
            style={{
              backgroundColor: "var(--color-brand-1)",
              display: "flex",
              justifyContent: "center",
            }}
            className="w-100 h-300px"
            src={"/assets/stays/empty.svg"}
          />
        )}
      </Box>
      <Box className="trip-stay-details__content">
        <Text heading size="xs" className="trip-stay-details__content__title">
          <h3 style={{ fontWeight: "bold", color: "var(--color-brand-2)" }}>Informações</h3>
        </Text>
        <Text className="trip-stay-details__content__description">
          {tripStay.details.information || EMPTY_INFO_DETAILS}
        </Text>
        <Box className="trip-stay-details__content__check-in-address">
          <Divider />
          <div className="trip-stay-details__content__check-in-address__item">
            <Picture src="/assets/stays/time.png" />
            <Text>Check-in às {tripStay.details.checkInHour || EMPTY_INFO_DETAILS}</Text>
          </div>
          <div className="trip-stay-details__content__check-in-address__item">
            <Picture src="/assets/stays/pin.png" />
            <Text>{tripStay.details.address}</Text>
          </div>
        </Box>
        {tripStay.cancellationInfo ? (
          <>
            <Text heading size="xs" className="trip-stay-details__content__title">
              Informações de cancelamento
            </Text>
            <Text className="trip-stay-details__content__description">
              {tripStay.cancellationInfo}
            </Text>
          </>
        ) : null}
      </Box>
      <div>
        <ul className="flex-column gap-md" style={{ paddingLeft: 0 }}>
          {tripStay.details.rooms
            .filter((room) => room.code != undefined)
            .map((room) => (
              <StayDetailsItem
                key={room.id}
                room={room}
                selected={room.code === selectedRoomInit}
                setSelected={() => {
                  setSelectedRoom(room.code!);
                }}
              />
            ))}
        </ul>
        <Button onClick={() => updateSelectedRoom(selectedRoomInit!)} disabled={!selectedRoomInit}>
          Salvar
        </Button>
      </div>
    </div>
  );
}
