import { Box, Picture, Text } from "@/ui";
import type { TripStayRoomDetailsModalProps } from "./trip-stay-room-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripStayServiceItem } from "@/features";
import { Icon } from "mars-ds";

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

      <Picture
        className="trip-stay-room-details-modal__cover-image"
        src={room.coverImageUrl ? room.coverImageUrl : "/assets/blank-image.png"}
      />

      <Box className="trip-stay-room-details-modal__details px-xl">
        <Text heading size="xs">
          Detalhes
        </Text>

        <Text style={{ color: "var(--color-gray-1)" }}>{room.details.information}</Text>

        <div className="trip-stay-room-details-modal__details__features mt-sm">
          {room.features?.map((feat, i) => (
            <TripStayServiceItem type={feat.type} title={feat.title} key={i} />
          ))}
        </div>
      </Box>

      {room.details.amenities && (
        <Box className="trip-stay-room-details-modal__amenities gap-md px-lg">
          <Text heading size="xs">
            Comodidades
          </Text>

          <div className="trip-stay-room-details-modal__amenities__list gap-sm">
            {room.details.amenities?.map((amnt, i) => (
              <div style={{ display: "flex" }} className="gap-sm" key={i}>
                <Icon name="check" size="sm" color="var(--color-gray-1)" />
                <Text style={{ color: "var(--color-gray-1)" }}>{amnt}</Text>
              </div>
            ))}
          </div>
        </Box>
      )}
    </div>
  );
}
