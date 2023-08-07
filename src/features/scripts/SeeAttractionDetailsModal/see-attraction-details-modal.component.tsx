import { Text, Box } from "@/ui";
import type { SeeAttractionDetailsModalProps } from "./see-attraction-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button, Divider, Icon } from "mars-ds";

export function SeeAttractionDetailsModal({
  className,
  children,
  sx,
  attraction,
  addAttractionClick,
  ...props
}: SeeAttractionDetailsModalProps) {
  const cn = makeCn("see-attraction-details-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      <Box className="see-attraction-details-modal__header">
        <Text heading className="see-attraction-details-modal__header__title">
          {attraction.name}
        </Text>
        <Text className="see-attraction-details-modal__header__subtitle">{`Turismo - ${attraction.purchasePrice}`}</Text>
      </Box>
      {attraction.availabilityInfo && (
        <Box className="see-attraction-details-modal__body">
          <Text size="xxl" className="see-attraction-details-modal__body__title">
            Informações
          </Text>
          <Text className="see-attraction-details-modal__body__description">
            {attraction.availabilityInfo}
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt molestie vehicula. Pellentesque libero purus, accumsan a nulla eu, ornare sollicitudin nisl."
            }
          </Text>
        </Box>
      )}
      <Divider />
      <Box className="see-attraction-details-modal__info-list">
        {attraction.availabilityInfo && (
          <div className="see-attraction-details-modal__info-list__item">
            <Icon size="sm" color="var(--color-brand-3)" name="clock" />
            <Text size="md">{attraction.availabilityInfo}</Text>
          </div>
        )}
        {attraction.address && (
          <div className="see-attraction-details-modal__info-list__item">
            <Icon size="sm" color="var(--color-brand-3)" name="map-pin" />
            <Text size="md">{attraction.address}</Text>
          </div>
        )}
      </Box>
      <Button
        iconName="thumbs-up"
        className="see-attraction-details-modal__add-button"
        onClick={() => addAttractionClick()}
      >
        Incluir no roteiro
      </Button>
    </div>
  );
}
