import { Box, Text, Picture, HoverTooltipCard, ThumbnailCarousel } from "@/ui";

import { Button, Divider, Grid, Skeleton } from "mars-ds";

import type { StayDetailsModalProps } from "@/features";

import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

const EMPTY_INFO_DETAILS = "-";

export function StayDetailsModal({
  tripId,
  itineraryActionId,
  router,
  onCloseModal,
  tripStay,
  allowEdit,
}: StayDetailsModalProps) {
  const handleEditButton = () => {
    if (onCloseModal) onCloseModal();
    router.push(`/app/viagens/${tripId}/hospedagem/editar/${itineraryActionId}`);
  };

  return (
    <>
      {/** @ts-ignore */}
      <div className="trip-stay-details">
        <Box className="trip-stay-details__initial-info">
          <div className="trip-stay-details__initial-info__header">
            <Text size="sm" heading className="trip-stay-details__initial-info__header__title">
              {tripStay.name}
            </Text>
            <Text>{tripStay.tags}</Text>
          </div>
          {tripStay.details.images?.length ? (
            <ThumbnailCarousel options={{}} slides={tripStay.details.images} />
          ) : tripStay.coverImage ? (
            <Picture className="trip-stay-details__initial-info__image" alt={tripStay.name}>
              {parsePhoto(tripStay.coverImage)}
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
            {tripStay.details.information || EMPTY_INFO_DETAILS}
          </Text>

          {tripStay.details.services && (
            <div className="trip-stay-details__content__service-list">
              {tripStay.boardInfo ? (
                <TripStayServiceItem title={tripStay.boardInfo} type={"breakfast"} />
              ) : null}
              {tripStay.details.services.map((service, i) => {
                if (service.title == tripStay.boardInfo) return null;
                return <TripStayServiceItem {...service} key={i} />;
              })}
            </div>
          )}
          <Box className="trip-stay-details__content__check-in-address">
            <Divider />
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/time.png" />
              <Text>Check-in às {tripStay.details.checkInHour || EMPTY_INFO_DETAILS}</Text>
            </div>
            <div className="trip-stay-details__content__check-in-address__item">
              <Picture src="/assets/stays/pin.png" />
              <Text>{tripStay.details.address}</Text>
            </div>
          </Box>
          {tripStay.cancellationInfo ? (
            <>
              <Text heading size="xs" className="trip-stay-details__content__title">
                Informações de cancelamento
              </Text>
              <Text className="trip-stay-details__content__description">
                {tripStay.cancellationInfo}
              </Text>
            </>
          ) : null}
        </Box>
        <Box className="flex justify-content-center px-md">
          {allowEdit ? (
            <Button className="w-100" style={{ maxWidth: 380 }} onClick={() => handleEditButton()}>
              Editar
            </Button>
          ) : (
            <HoverTooltipCard text="A escolha da sua hospedagem ainda não está disponível online.">
              <Button
                className="w-100"
                style={{ maxWidth: 380 }}
                variant="secondary"
                size="sm"
                iconName="lock"
              >
                Editar
              </Button>
            </HoverTooltipCard>
          )}
        </Box>
      </div>
    </>
  );
}

export const StayDetailsLoadingState = () => (
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
