import type { TripStay } from "@/core/types";
import type { TripHotelCardProps } from "./trip-hotel-card.types";
import { Button, Card, Modal, Grid } from "mars-ds";
import { TripStayDetails, TripStayServiceItem } from "@/features";
import { Picture, Text } from "@/ui";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

export const TripHotelCard = ({
  tripStayData,
  isCurated = false,
  onSelect,
  isSelected,
  tripId,
  router,
  uniqueTransactionId,
}: TripHotelCardProps) => {
  const selectedColor = isCurated ? "var(--color-brand-4)" : "var(--color-brand-1)";

  const handleSelect = () => {
    onSelect();
  };

  const handleSeeMore = (tripStay: TripStay) => {
    Modal.open(
      () => (
        <TripStayDetails
          uniqueTransactionId={uniqueTransactionId}
          stayData={tripStay}
          tripId={tripId}
          router={router}
          isModalView
        />
      ),
      {
        closable: true,
        size: "md",
      }
    );
  };
  return (
    <Card
      className="trip-hotel-card"
      style={{ border: `2px solid ${isSelected ? selectedColor : "var(--color-gray-3)"}` }}
    >
      <div className="trip-hotel-card__content">
        <Grid className="gap-md" columns={["30%", "auto"]}>
          <Picture className="trip-hotel-card__content__info__image">
            {tripStayData.coverImage
              ? parsePhoto(tripStayData.coverImage)
              : tripStayData.coverImageUrl
              ? tripStayData.coverImageUrl
              : "/assets/blank-image.png"}
          </Picture>
          <div className="trip-hotel-card__content__info__data gap-md">
            <div className="trip-hotel-card__content__info__data__header">
              <Text size="xl">{tripStayData.name}</Text>
              <Text size="lg" style={{ color: "var(--color-brand-4)", marginTop: 0 }}>
                {tripStayData.tags}
              </Text>
            </div>

            <div className="trip-hotel-card__content__info__data__footer">
              <Text size="lg">{formatByDataType(tripStayData.details.price, "CURRENCY")}</Text>
              <Text style={{ color: "var(--color-gray-1)", marginTop: 0 }}>
                {tripStayData.details.information}
              </Text>
            </div>
          </div>
        </Grid>
        <div className="trip-hotel-card__content__info__services gap-lg">
          {tripStayData.details.services.map((item, i) => (
            <TripStayServiceItem
              type={item.type}
              title={item.title}
              color={isCurated ? selectedColor : "var(--color-brand-1)"}
              key={i}
            />
          ))}
        </div>
        <div
          className="trip-hotel-card__content__divider"
          style={{
            width: "100%",
            border: `.5px solid ${isSelected ? selectedColor : "var(--color-gray-3)"}`,
          }}
        ></div>
        <div className="trip-hotel-card__content__button-area">
          {tripStayData.details.rooms.length ? (
            <Button
              iconName={isSelected ? "check-circle" : "circle"}
              size="sm"
              variant="naked"
              style={{
                color: isSelected ? selectedColor : "var(--color-gray-2)",
              }}
              onClick={() => handleSelect()}
            >
              {isSelected ? "Selecionado" : "Selecionar este"}
            </Button>
          ) : (
            <Text size="xl" className="trip-hotel-card__content__button-area__unavailable">
              Indisponível
            </Text>
          )}

          <Text
            onClick={() => handleSeeMore(tripStayData)}
            className="trip-hotel-card__content__button-area__see-more"
          >
            ver mais
          </Text>
        </div>
      </div>
    </Card>
  );
};
