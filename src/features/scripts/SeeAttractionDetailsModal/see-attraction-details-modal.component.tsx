import { Text, Box, ErrorState, GlobalLoader, EmptyState } from "@/ui";
import type { SeeAttractionDetailsModalProps } from "./see-attraction-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button, Divider, Icon } from "mars-ds";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import { TripScriptsApiService } from "@/services/api";
import { AttractionDetail } from "@/core/types";
import useSWR from "swr";

export function SeeAttractionDetailsModal({
  className,
  children,
  sx,
  attraction,
  addAttractionClick,
  ...props
}: SeeAttractionDetailsModalProps) {
  const cn = makeCn("see-attraction-details-modal", className)(sx);

  const uniqueKeyName = `attraction-${attraction.id}-details`;
  const fetcher = async () => TripScriptsApiService.getAttractionDetails(attraction.id);
  const { isLoading, data, error } = useSWR<AttractionDetail>(uniqueKeyName, fetcher);

  if (error) {
    return (
      <div className={cn} {...props}>
        <ErrorState />
      </div>);
  }

  if (isLoading) {
    return (
      <div className={cn} {...props}>
        <GlobalLoader inline />
      </div>);
  }

  if (!data) {
    return (
      <div className={cn} {...props}>
        <EmptyState />
      </div>);
  }

  return (
    <div className={cn} {...props}>
      <Box className="see-attraction-details-modal__header">
        <Text heading className="see-attraction-details-modal__header__title">
          {attraction.name}
        </Text>
        <Text className="see-attraction-details-modal__header__subtitle">
          {data.tags}
        </Text>
      </Box>
      {data.description && (
        <Box className="see-attraction-details-modal__body">
          <Text size="xxl" className="see-attraction-details-modal__body__title">
            Informações
          </Text>
          <Text className="see-attraction-details-modal__body__description">
            {data.description}
          </Text>
        </Box>
      )}
      <Divider />
      <Box className="see-attraction-details-modal__info-list">
        {data.availabilityInfo && (
          <div className="see-attraction-details-modal__info-list__item">
            <Icon size="sm" color="var(--color-brand-3)" name="clock" />
            <Text size="md">{data.availabilityInfo}</Text>
          </div>
        )}
        {attraction.address && (
          <div className="see-attraction-details-modal__info-list__item">
            <Icon size="sm" color="var(--color-brand-3)" name="map-pin" />
            <Text size="md">{attraction.address}</Text>
          </div>
        )}
      </Box>
      {
        addAttractionClick !== undefined ?
          <Button
            iconName="thumbs-up"
            className="see-attraction-details-modal__add-button"
            onClick={addAttractionClick}
          >
            Incluir no roteiro
          </Button>
        : 
        <Button
          iconName="thumbs-up"
          className="see-attraction-details-modal__add-button"
          disabled
        >
          Já incluso no roteiro
        </Button>
      }
    </div>
  );
}
