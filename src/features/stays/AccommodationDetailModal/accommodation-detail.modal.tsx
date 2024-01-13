import { Box, Text, Picture } from "@/ui";

import { Button, Divider } from "mars-ds";

import { Carousel } from "@/ui";
import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { AccommodationDetailProps } from "./accommodation-detail.types";

const EMPTY_INFO_DETAILS = "-";

export function AccommodationDetailModal({
  data,
  tripId,
  itineraryActionId,
  router,
  onCloseModal,
}: AccommodationDetailProps) {

  const handleEditButton = () => {
    if (onCloseModal) onCloseModal();
    router.push(`/app/viagens/${tripId}/hospedagem/editar?idItinerario=${itineraryActionId}`);
  };

  return (
    <>
      {/** @ts-ignore */}
      <div className="trip-stay-details">
        <Box className="trip-stay-details__initial-info">
          <div className="trip-stay-details__initial-info__header">
            <Text size="sm" heading className="trip-stay-details__initial-info__header__title">
              {data.name}
            </Text>
            <Text>{data.details.address}</Text>
          </div>
          {data.details.images?.length ? (
            <Carousel height={300}>
              {data.details.images.map((image, key) => (
                <Picture className="trip-stay-details__initial-info__image" key={key}>
                  {parsePhoto(image)}
                </Picture>
              ))}
            </Carousel>
          ) : data.coverImage ? (
            <Picture className="trip-stay-details__initial-info__image" alt={data.name}>
              {parsePhoto(data.coverImage)}
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
            Informações
          </Text>
          <Text className="trip-stay-details__content__description">
            {data.details.information || EMPTY_INFO_DETAILS}
          </Text>

          {data.details.services && (
            <div className="trip-stay-details__content__service-list">
              {data.details.services.map((service, i) => (
                <TripStayServiceItem {...service} key={i} />
              ))}
            </div>
          )}
          <Box className="trip-stay-details__content__check-in-address">
            <Divider />
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/time.png" />
              <Text>Check-in às {data.details.checkInHour || EMPTY_INFO_DETAILS}</Text>
            </div>
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/pin.png" />
              <Text>{data.details.address}</Text>
            </div>
          </Box>
          {data.cancellationInfo ? (
            <>
              <Text heading size="xs" className="trip-stay-details__content__title">
                Informações de cancelamento
              </Text>
              <Text className="trip-stay-details__content__description">
                {data.cancellationInfo}
              </Text>
            </>
          ) : null}
        </Box>
        <Box className="flex justify-content-center px-md">
          <Button className="w-100" style={{ maxWidth: 380 }} onClick={() => handleEditButton()}>
            Editar
          </Button>
        </Box>
      </div>
    </>
  );
}