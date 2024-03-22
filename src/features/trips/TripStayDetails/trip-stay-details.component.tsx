import { Box, Text, Picture, ErrorState, EmptyState, ThumbnailCarousel } from "@/ui";
import type { TripStayDetailsProps } from "./trip-stay-details.types";

import { Button, Divider, Grid, Skeleton } from "mars-ds";

import { TripStayServiceItem } from "@/features";
import { useAppStore } from "@/core/store";
import { StaysApiService } from "@/services/api";
import useSWR from "swr";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

const EMPTY_INFO_DETAILS = "-";

export function TripStayDetails({
  stayData,
  tripId,
  style,
  uniqueTransactionId,
  router,
  onCloseModal,
}: TripStayDetailsProps) {
  const itineraryActionId = String(router.query.iditinerario ?? "");

  const { accommodation, updateAccommodation } = useAppStore((state) => ({
    updateAccommodation: state.updateAccommodationState,
    accommodation: state.accommodation,
  }));

  const fetcher = async () =>
    StaysApiService.getHotelDetails(tripId, {
      tripItineraryActionId: itineraryActionId,
      uniqueTransactionId,
      accommodation: {
        id: stayData.id,
        code: stayData.code,
        system: stayData.system,
        provider: stayData.provider,
        signature: stayData.signature,
        rooms: [stayData.details.rooms[0]],
      },
    });
  const identificator =
    stayData.id ?? stayData.code ?? stayData.system ?? stayData.provider ?? stayData.signature;
  const {
    data: hotelData,
    isLoading,
    error,
    isValidating,
  } = useSWR(`get-hotel-details-${tripId}-hotel-${identificator}`, fetcher);

  if (error) return <ErrorState />;
  if (isLoading || isValidating) return <StayDetailsLoadingState />;
  if (!hotelData) return <EmptyState />;

  return (
    <>
      {/** @ts-ignore */}
      <div className="trip-stay-details" style={style}>
        <Box className="trip-stay-details__initial-info">
          <div className="trip-stay-details__initial-info__header">
            <Text size="sm" heading className="trip-stay-details__initial-info__header__title">
              {hotelData.name}
            </Text>
            <Text>{hotelData.details.address}</Text>
          </div>
          {hotelData.details.images?.length ? (
            <ThumbnailCarousel height={300} slides={hotelData.details.images} options={{}} />
          ) : hotelData.coverImage ? (
            <Picture className="trip-stay-details__initial-info__image" alt={hotelData.name}>
              {parsePhoto(hotelData.coverImage)}
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
            {hotelData.details.information || EMPTY_INFO_DETAILS}
          </Text>
          {hotelData.details.services && (
            <div className="trip-stay-details__content__service-list">
              {hotelData.details.services.map((service, i) => (
                <TripStayServiceItem {...service} key={i} />
              ))}
            </div>
          )}
          <Box className="trip-stay-details__content__check-in-address">
            <Divider />
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/time.png" />
              <Text>Check-in às {hotelData.details.checkInHour || EMPTY_INFO_DETAILS}</Text>
            </div>
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/pin.png" />
              <Text>{hotelData.details.address}</Text>
            </div>
          </Box>
          {hotelData.cancellationInfo ? (
            <>
              <Text heading size="xs" className="trip-stay-details__content__title">
                Informações de cancelamento
              </Text>
              <Text className="trip-stay-details__content__description">
                {hotelData.cancellationInfo}
              </Text>
            </>
          ) : null}
        </Box>
      </div>
    </>
  );
}

const StayDetailsLoadingState = () => (
  <Box className="flex-column w-100 gap-lg">
    <Skeleton active width={"60%"} height={20} />
    <Skeleton active width={"40%"} style={{ marginBottom: 15 }} />
    <Skeleton active width={"100%"} height={350} />
    <Skeleton active width={"30%"} height={20} style={{ marginBottom: 15 }} />
    <Grid className="w-100">
      <Skeleton active width={"100%"} />
      <Skeleton active width={"100%"} />
      <Skeleton active width={"100%"} />
    </Grid>
    <Skeleton active width={"30%"} />
    <Skeleton active width={"30%"} />
  </Box>
);
