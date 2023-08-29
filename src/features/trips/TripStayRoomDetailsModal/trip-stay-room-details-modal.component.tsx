import { Box, Picture, Text } from "@/ui";
import type { TripStayRoomDetailsModalProps } from "./trip-stay-room-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function TripStayRoomDetailsModal({
  className,
  children,
  sx,
  room,
  ...props
}: TripStayRoomDetailsModalProps) {
  const cn = makeCn("trip-stay-room-details-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      <Text
        className="trip-stay-room-details-modal__title"
        heading
        style={{ color: "var(--color-brand-1)" }}
      >
        {room.title}
      </Text>

      <Picture className="trip-stay-room-details-modal__cover-image" src={room.coverImageUrl} />

      <Box className="trip-stay-room-details-modal__details">
        <Text heading size="xs">
          Detalhes
        </Text>

        <Text>{room.subtitle}</Text>
      </Box>
    </div>
  );
}
