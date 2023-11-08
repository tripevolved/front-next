import { Box, Text, Picture } from "@/ui";
import type { TripStayDetailsProps } from "./trip-stay-details.types";

import { Button, Divider } from "mars-ds";
import { Carousel } from "@/ui";
import { TripStayServiceItem } from "@/features";
import { parseNumericValue } from "@/utils/helpers/css.helpers";
import { useAppStore } from "@/core/store";

const EMPTY_INFO_DETAILS = "-";

export function TripStayDetails({
  stayData,
  tripId,
  isModalView = false,
  style,
  uniqueTransactionId,
  router,
  onCloseModal,
}: TripStayDetailsProps) {
  let computedStyle;

  computedStyle = style;

  const { accommodation, updateAccommodation } = useAppStore((state) => ({
    updateAccommodation: state.updateAccommodationState,
    accommodation: state.accommodation,
  }));

  const handleRoomsButton = () => {
    updateAccommodation({ ...accommodation, ...stayData, uniqueTransactionId });
    if (onCloseModal) onCloseModal();
    router.push(`/app/viagens/criar/${tripId}/hospedagem/quartos`);
  };

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
              {stayData.name}
            </Text>
            <Text>{stayData.details.address}</Text>
          </div>
          {stayData.details.images?.length ? (
            <Carousel height={300}>
              {stayData.details.images.map((image, key) => (
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
              src={"/assets/stays/empty.svg"}
            />
          )}
        </Box>
        <Box className="trip-stay-details__content">
          <Text heading size="xs" className="trip-stay-details__content__title">
            Informações
          </Text>
          <Text className="trip-stay-details__content__description">
            {stayData.details.information || EMPTY_INFO_DETAILS}
          </Text>

          {stayData.details.services && (
            <div className="trip-stay-details__content__service-list">
              {stayData.details.services.map((service, i) => (
                <TripStayServiceItem {...service} key={i} />
              ))}
            </div>
          )}
          <Box className="trip-stay-details__content__check-in-address">
            <Divider />
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/time.png" />
              <Text>Check-in às {stayData.details.checkInHour || EMPTY_INFO_DETAILS}</Text>
            </div>
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/pin.png" />
              <Text>{stayData.details.address}</Text>
            </div>
          </Box>
          {stayData.cancellationInfo ? (
            <>
              <Text heading size="xs" className="trip-stay-details__content__title">
                Informações de cancelamento
              </Text>
              <Text className="trip-stay-details__content__description">
                {stayData.cancellationInfo}
              </Text>
            </>
          ) : null}
        </Box>
        {!isModalView ? (
          <Box className="trip-stay-details__footer-buttons gap-lg px-md">
            <Button
              className="trip-stay-details__footer-buttons__buttons"
              variant="naked"
              href={`/app/viagens/criar/${tripId}/hospedagem/editar-hotel/`}
            >
              Editar
            </Button>
            <Button
              className="trip-stay-details__footer-buttons__buttons"
              style={{ color: "var(--color-gray-4)" }}
              onClick={() => handleRoomsButton()}
            >
              Quartos
            </Button>
          </Box>
        ) : null}
      </div>
    </>
  );
}
