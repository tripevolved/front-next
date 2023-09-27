import { TripStayRoom } from "@/core/types";
import { TripStayRoomDetailsModal, TripStayServiceItem } from "@/features";

import { Picture, Text } from "@/ui";
import { Modal, Card, Button } from "mars-ds";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import { useState } from "react";

export const TripStayRoomCard = ({
  coverImageUrl,
  details,
  features,
  id,
  isSelected,
  price,
  subtitle,
  title,
}: TripStayRoom) => {
  const [selected, setSelected] = useState(false);

  const handleSeeMore = (room: TripStayRoom) => {
    Modal.open(() => <TripStayRoomDetailsModal room={room} />, { size: "md", closable: true });
  };

  return (
    <Card
      className="trip-stay-room-card"
      style={{ border: `2px solid ${selected ? "var(--color-brand-1)" : "var(--color-gray-3)"}` }}
    >
      <div className="trip-stay-room-card__content">
        <div className="trip-stay-room-card__content__info">
          <Picture className="trip-stay-room-card__content__info__image" src={coverImageUrl} />
          <div className="trip-stay-room-card__content__info__data">
            <div className="trip-stay-room-card__content__info__data__header">
              <Text size="lg">{title}</Text>
              <Text style={{ color: "var(--color-gray-1)", marginTop: 0 }}>{subtitle}</Text>
            </div>

            <TripStayServiceItem type={features[0].type} title={features[0].title} />
          </div>
          <div className="trip-stay-room-card__content__info__price">
            <Text size="lg">{formatByDataType(price, "CURRENCY")}</Text>

            <Text
              style={{
                color: "var(--color-gray-1)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() =>
                handleSeeMore({
                  id,
                  isSelected,
                  features,
                  details,
                  subtitle,
                  title,
                  price,
                  coverImageUrl,
                })
              }
            >
              ver mais
            </Text>
          </div>
        </div>
        <div
          className="trip-stay-room-card__content__divider"
          style={{
            width: "100%",
            border: `.5px solid ${selected ? "var(--color-brand-1)" : "var(--color-gray-3)"}`,
          }}
        ></div>
        <div className="trip-stay-room-card__content__button-area">
          <Button
            iconName={selected ? "check-circle" : "circle"}
            size="sm"
            variant="naked"
            style={{
              width: "100%",
              color: selected ? "var(--color-brand-1)" : "var(--color-gray-2)",
            }}
            onClick={() => setSelected(!selected)}
          >
            {selected ? "Selecionado" : "Selecionar este"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
