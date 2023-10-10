import type { TripStay } from "@/core/types";
import type { TripHotelCardProps } from "./trip-hotel-card.types";
import { Button, Card, Modal, RatingStar } from "mars-ds";
import { useState } from "react";
import { TripStayDetails, TripStayServiceItem } from "@/features";
import { Picture, Text } from "@/ui";
import { formatByDataType } from "@/utils/helpers/number.helpers";

export const TripHotelCard = ({
  tripStayData,
  isCurated = false,
  onSelect,
}: TripHotelCardProps) => {
  const [selected, setSelected] = useState(false);
  const selectedColor = isCurated ? "var(--color-brand-4)" : "var(--color-brand-1)";

  const handleSelect = () => {
    setSelected(!selected);
    onSelect();
  };

  const handleSeeMore = (tripStay: TripStay) => {
    Modal.open(
      () => (
        <TripStayDetails
          stayData={tripStay.details}
          tripId={tripStayData.id!}
          name={tripStay.name}
        />
      ),
      {
        closable: true,
        size: "sm",
      }
    );
  };

  return (
    <Card
      className="trip-hotel-card"
      style={{ border: `2px solid ${selected ? selectedColor : "var(--color-gray-3)"}` }}
    >
      <div className="trip-hotel-card__content">
        <div className="trip-hotel-card__content__info gap-md">
          <Picture
            className="trip-hotel-card__content__info__image"
            src={`${tripStayData.coverImageUrl}`}
          />
          <div className="trip-hotel-card__content__info__data gap-md">
            <div className="trip-hotel-card__content__info__data__header">
              <Text size="lg">{tripStayData.name}</Text>
              <RatingStar total={5} value={3} />
            </div>

            <div className="trip-hotel-card__content__info__data__footer">
              <Text size="lg">{formatByDataType(tripStayData.details.price, "CURRENCY")}</Text>
              <Text style={{ color: "var(--color-gray-1)", marginTop: 0 }}>
                {tripStayData.details.information}
              </Text>
            </div>
          </div>
        </div>
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
            border: `.5px solid ${selected ? selectedColor : "var(--color-gray-3)"}`,
          }}
        ></div>
        <div className="trip-hotel-card__content__button-area">
          <Button
            iconName={selected ? "check-circle" : "circle"}
            size="sm"
            variant="naked"
            style={{
              color: selected ? selectedColor : "var(--color-gray-2)",
            }}
            onClick={() => handleSelect()}
          >
            {selected ? "Selecionado" : "Selecionar este"}
          </Button>

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
