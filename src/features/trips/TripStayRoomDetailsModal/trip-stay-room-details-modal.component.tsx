import { Box, Picture, Tag, Text } from "@/ui";
import type { TripStayRoomDetailsModalProps } from "./trip-stay-room-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripStayServiceItem } from "@/features";
import { Icon } from "mars-ds";
import { trimAfterParentheses } from "@/utils/helpers/strings.helper";
import { TripStayRoom } from "@/core/types";
import { formatByDataType, setBRLCurrencyValue } from "@/utils/helpers/number.helpers";

const EMPTY_INFO_DETAILS = "As informações ainda não foram definidas";

export function TripStayRoomDetailsModal({
  className,
  children,
  sx,
  room,
  ...props
}: TripStayRoomDetailsModalProps) {
  const cn = makeCn("trip-stay-room-details-modal", className)(sx);

  const getBoardChoice = (str: TripStayRoom["boardChoice"] | string) => {
    const options = {
      RO: "Somente quarto",
      BB: "Cama e café da  manhhã",
      AI: "Tudo incluso",
    };
    // @ts-ignore
    return options[str];
  };

  return (
    <div className={cn} {...props}>
      <Text
        className="trip-stay-room-details-modal__title"
        heading
        style={{ color: "var(--color-brand-1)" }}
      >
        {trimAfterParentheses(room.title)}
      </Text>

      <Picture
        className="trip-stay-room-details-modal__cover-image"
        src={room.coverImageUrl ? room.coverImageUrl : "/assets/blank-image.png"}
      />

      <Box className="trip-stay-room-details-modal__details px-xl">
        <Text heading size="xs">
          Detalhes
        </Text>

        <Text style={{ color: "var(--color-gray-1)" }}>
          {room.details.information || EMPTY_INFO_DETAILS}
        </Text>

        {room.features?.length ? (
          <div className="trip-stay-room-details-modal__details__features mt-sm">
            {room.features?.map((feat, i) => (
              <TripStayServiceItem type={feat.type} title={feat.title} key={i} />
            ))}
          </div>
        ) : null}
        <Text size="xxl" className="color-primary">
          {setBRLCurrencyValue(room.price, room.currency)}
        </Text>
        {room.boardChoice ? <Tag>{getBoardChoice(room.boardChoice)}</Tag> : null}
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
