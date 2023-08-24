import { Box, Text, Picture } from "@/ui";
import type { TripStayDetailsModalProps } from "./trip-stay-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripStayFeature } from "@/core/types";
import { FC } from "react";
import { Divider } from "mars-ds";

export function TripStayDetailsModal({
  className,
  children,
  sx,
  stayData,
  ...props
}: TripStayDetailsModalProps) {
  const cn = makeCn("trip-stay-details-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      <Box className="trip-stay-details-modal__initial-info">
        <div className="trip-stay-details-modal__initial-info__header">
          <Text size="sm" heading className="trip-stay-details-modal__initial-info__header__title">
            {"Hotel Casa Grande"}
          </Text>
          <Text>
            Hotel {stayData.currency} em {"Ouro Preto"}
          </Text>
        </div>
        {/** TODO: apply image carousel here */}
        <Picture src="https://picsum.photos/400/300" />
      </Box>
      <Box className="trip-stay-details-modal__content">
        <Text heading size="xs" className="trip-stay-details-modal__content__title">
          Informações
        </Text>
        <Text className="trip-stay-details-modal__content__description">
          {stayData.information}
        </Text>
        <div className="trip-stay-details-modal__content__service-list">
          {stayData.services.map((service, i) => (
            <TripStayServiceItem {...service} key={i} />
          ))}
        </div>
        <Box className="trip-stay-details-modal__content__check-in-address">
          <Divider />
          <Text>
            <Picture src="/assets/stays/time.png" /> {stayData.checkInHour}
          </Text>
          <Text>
            <Picture src="/assets/stays/pin.png" /> {stayData.address}
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export const TripStayServiceItem: FC<TripStayFeature> = ({ title, type }) => {
  return (
    <div className="trip-stay-feature-item">
      <Picture src={`/assets/stays/${type}.svg`} />
      <Text>{title}</Text>
    </div>
  );
};
