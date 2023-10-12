import { Box, Text, Picture } from "@/ui";
import type { TripStayDetailsProps } from "./trip-stay-details.types";

import { Button, Divider } from "mars-ds";
import { Carousel } from "@/ui";
import { TripStayServiceItem } from "@/features";
import { parseNumericValue } from "@/utils/helpers/css.helpers";

export function TripStayDetails({
  stayData,
  name,
  tripId,
  isModalView = false,
  style,
}: TripStayDetailsProps) {
  let computedStyle;

  computedStyle = style;

  if (isModalView) {
    computedStyle = {
      maxHeight: parseNumericValue(600),
      overflowY: "scroll",
      ...style,
    };
  }

  return (
    <>
      {/** @ts-ignore */}
      <div className="trip-stay-details" style={computedStyle}>
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
          ) : (
            <Picture
              style={{
                backgroundColor: "var(--color-brand-1)",
                display: "flex",
                justifyContent: "center",
              }}
              className="w-100 h-300px"
              src={"/assets/blank-image.png"}
            />
          )}
        </Box>
        <Box className="trip-stay-details__content">
          <Text heading size="xs" className="trip-stay-details__content__title">
            Informações
          </Text>
          {stayData.information ? (
            <Text className="trip-stay-details__content__description">{stayData.information}</Text>
          ) : (
            <Text className="trip-stay-details__content__description">
              As informações ainda não foram definidas.
            </Text>
          )}

          {stayData.services && (
            <div className="trip-stay-details__content__service-list">
              {stayData.services.map((service, i) => (
                <TripStayServiceItem {...service} key={i} />
              ))}
            </div>
          )}
          <Box className="trip-stay-details__content__check-in-address">
            <Divider />
            {stayData.checkInHour ? (
              <div className="trip-stay-details__content__check-in-address__item">
                <Picture src="/assets/stays/time.png" />
                <Text>{stayData.checkInHour}</Text>
              </div>
            ) : null}
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/pin.png" />
              <Text>{stayData.address}</Text>
            </div>
          </Box>
        </Box>
        {!isModalView ? (
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
        ) : null}
      </div>
    </>
  );
}
