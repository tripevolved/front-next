import { Box, Text, Picture } from "@/ui";
import type { TripStayDetailsProps } from "./trip-stay-details.types";

import { Button, Divider } from "mars-ds";
import { Carousel } from "@/ui";
import { TripStayServiceItem } from "@/features";

export function TripStayDetails({ stayData, name, tripId }: TripStayDetailsProps) {
  return (
    <div className="trip-stay-details">
      <Box className="trip-stay-details__initial-info">
        <div className="trip-stay-details__initial-info__header">
          <Text size="sm" heading className="trip-stay-details__initial-info__header__title">
            {name}
          </Text>
          <Text>Hotel em {stayData.address}</Text>
        </div>
        {stayData.images ? (
          <Carousel height={300}>
            {stayData.images.map((image, key) => (
              <Picture
                className="trip-stay-details__initial-info__image"
                src={image.url}
                alt={image.altText!}
                key={key}
              />
            ))}
          </Carousel>
        ) : null}
      </Box>
      <Box className="trip-stay-details__content">
        <Text heading size="xs" className="trip-stay-details__content__title">
          Informações
        </Text>
        <Text className="trip-stay-details__content__description">{stayData.information}</Text>
        {stayData.services && (
          <div className="trip-stay-details__content__service-list">
            {stayData.services.map((service, i) => (
              <TripStayServiceItem {...service} key={i} />
            ))}
          </div>
        )}
        <Box className="trip-stay-details__content__check-in-address">
          <Divider />
          <div className="trip-stay-details__content__check-in-address__item">
            <Picture src="/assets/stays/time.png" />
            <Text>{stayData.checkInHour}</Text>
          </div>
          <div className="trip-stay-details__content__check-in-address__item">
            <Picture src="/assets/stays/pin.png" />
            <Text>{stayData.address}</Text>
          </div>
        </Box>
      </Box>
      <Box className="trip-stay-details__footer-buttons gap-lg">
        <Button className="trip-stay-details__footer-buttons__buttons" variant="naked">
          Editar
        </Button>
        <Button
          className="trip-stay-details__footer-buttons__buttons"
          style={{ color: "var(--color-gray-4)" }}
          href={`/app/viagens/criar/${tripId}/hospedagem/quartos`}
        >
          Quartos
        </Button>
      </Box>
    </div>
  );
}
