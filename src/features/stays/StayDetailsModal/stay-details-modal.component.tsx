import { Box, Text, Picture, ThumbnailCarousel } from "@/ui";

import { Card, Divider, Grid, Skeleton } from "mars-ds";

import type { StayDetailsModalProps } from "@/features";

import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { Checkbox } from "@/ui/components/forms/Checkbox";

const EMPTY_INFO_DETAILS = "-";

export function StayDetailsModal({ tripStay }: StayDetailsModalProps) {
  console.log(tripStay);
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
        <div>
          <ul className="flex-column gap-md" style={{ paddingLeft: 0 }}>
            {tripStay.details.rooms.map((room) => {
              return (
                <Card
                  style={{
                    border: "1px solid var(--color-gray-3)",
                    backgroundColor: "white",
                  }}
                  key={room.id}
                >
                  <Grid columns={["100px", "auto", "auto"]}>
                    <Picture src={room.coverImageUrl ?? "/assets/blank-image.png"} />
                    <Text style={{ color: "var(--color-brand-2)" }}>{room.title} </Text>
                    <Text
                      size="md"
                      style={{ fontWeight: "bold", marginTop: 0, color: "var(--color-brand-2)" }}
                    >{`R$${room.price}`}</Text>
                  </Grid>
                  <Divider
                    style={{
                      backgroundColor: "var(--color-gray-3)",
                      borderWidth: 2,
                    }}
                  />
                  <div className="flex-column pt-sm" style={{ alignItems: "center" }}>
                    <Checkbox
                      checked={false}
                      label="Selecionar este"
                      key={room.id}
                      onClick={() => {}}
                    />
                  </div>
                </Card>
              );
            })}
          </ul>
        </div>
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
