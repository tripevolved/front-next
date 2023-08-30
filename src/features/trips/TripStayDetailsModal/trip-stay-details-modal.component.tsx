import { Box, Text, Picture } from "@/ui";
import type { TripStayDetailsModalProps } from "./trip-stay-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripStayFeature, TripStayRoom } from "@/core/types";
import { useState } from "react";
import { Button, Card, Divider, Modal } from "mars-ds";
import { Carousel } from "@/ui";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import { TripStayRoomDetailsModal } from "../TripStayRoomDetailsModal";

export function TripStayDetailsModal({
  className,
  children,
  sx,
  stayData,
  name,
  ...props
}: TripStayDetailsModalProps) {
  const cn = makeCn("trip-stay-details-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      <Box className="trip-stay-details-modal__initial-info">
        <div className="trip-stay-details-modal__initial-info__header">
          <Text size="sm" heading className="trip-stay-details-modal__initial-info__header__title">
            {name}
          </Text>
          <Text>Hotel em {stayData.address}</Text>
        </div>
        <Carousel height={220}>
          {stayData.images?.map((image, i) => (
            <Picture
              className="trip-stay-details-modal__initial-info__image"
              src={image.url}
              alt={image.altText!}
              key={i}
            />
          ))}
        </Carousel>
      </Box>
      <Box className="trip-stay-details-modal__content">
        <Text heading size="xs" className="trip-stay-details-modal__content__title">
          Informações
        </Text>
        <Text className="trip-stay-details-modal__content__description">
          {stayData.information}
        </Text>
        <div className="trip-stay-details-modal__content__service-list">
          {stayData.services.map((service, i) => (
            <TripStayServiceItem {...service} key={i} />
          ))}
        </div>
        <Box className="trip-stay-details-modal__content__check-in-address">
          <Divider />
          <div className="trip-stay-details-modal__content__check-in-address__item">
            <Picture src="/assets/stays/time.png" />
            <Text>{stayData.checkInHour}</Text>
          </div>
          <div className="trip-stay-details-modal__content__check-in-address__item">
            <Picture src="/assets/stays/pin.png" />
            <Text>{stayData.address}</Text>
          </div>
        </Box>
      </Box>
      <Box className="trip-stay-details-modal__rooms">
        <Text heading size="xs" style={{ marginBottom: 10 }}>
          Quartos
        </Text>
        {stayData.rooms.map((room, i) => (
          <TripStayRoomCard {...room} key={i} />
        ))}
      </Box>
    </div>
  );
}

export const TripStayServiceItem = ({ title, type }: TripStayFeature) => {
  return (
    <div className="trip-stay-feature-item">
      <Picture src={`/assets/stays/${type}.svg`} />
      <Text>{title}</Text>
    </div>
  );
};

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
    Modal.open(() => <TripStayRoomDetailsModal room={room} />, { size: "sm", closable: true });
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
