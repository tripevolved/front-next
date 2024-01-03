import { Box, Text, Picture } from "@/ui";
import type { TripStayDetailsProps } from "./trip-stay-details.types";

import { Button, Divider } from "mars-ds";

import { Carousel } from "@/ui";
import { TripStayServiceItem } from "@/features";
import { useAppStore } from "@/core/store";
import { StaysApiService } from "@/services/api";
import { AccommodationBody, RoomAccomodation } from "@/services/api/stays/by-trip";
import useSWR from "swr";

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
  const { accommodation, updateAccommodation } = useAppStore((state) => ({
    updateAccommodation: state.updateAccommodationState,
    accommodation: state.accommodation,
  }));

  const handleRoomsButton = () => {
    updateAccommodation({ ...accommodation, ...stayData, uniqueTransactionId });
    if (onCloseModal) onCloseModal();
    router.push(`/app/viagens/${tripId}/hospedagem/quartos`);
  };

  const fetcher = async () =>
    StaysApiService.getHotelDetails(tripId, {
      tripItineraryActionId: accommodation.itineraryActionId,
      accommodation: {
        id: stayData.id,
        code: stayData.code,
        system: stayData.system,
        provider: stayData.provider,
        signature: stayData.signature,
        rooms: stayData.details.rooms.map((room) => ({
          id: room.id,
          code: room.code,
          signature: room.signature,
          provider: room.provider,
        })),
      },
    });
  const { data: hotelData, isLoading, error } = useSWR(`get-hotel-details-${tripId}`, fetcher);

  console.log("INFORMAÇÕES DO HOTEL", hotelData);

  return (
    <>
      {/** @ts-ignore */}
      <div className="trip-stay-details" style={style}>
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
          ) : stayData.coverImage ? (
            <Picture className="trip-stay-details__initial-info__image" alt={stayData.name}>
              {stayData.coverImage}
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
              variant="secondary"
              href={`/app/viagens/${tripId}/hospedagem/editar`}
            >
              Editar
            </Button>
            <Button
              className="trip-stay-details__footer-buttons__buttons"
              style={{ color: "var(--color-gray-4)" }}
              onClick={() => handleRoomsButton()}
              disabled={!stayData.isRoomSelected}
            >
              Quartos
            </Button>
          </Box>
        ) : null}
      </div>
    </>
  );
}
