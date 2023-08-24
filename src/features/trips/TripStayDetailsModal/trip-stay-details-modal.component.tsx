import { Box, Text, Picture } from "@/ui";
import type { TripStayDetailsModalProps } from "./trip-stay-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripStayFeature } from "@/core/types";
import { FC } from "react";

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
            Hotel {"3 estrelas"} em {"Ouro Preto"}
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
          {
            "O hotel conta com frigobar, ar condicionado, toalhas e Wi-fi. Café da manhã incluso na diária."
          }
        </Text>
        <div className="trip-stay-details-modal__content__service-list">
          {stayData.services.map((service, i) => (
            <TripStayServiceItem {...service} key={i} />
          ))}
        </div>
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
