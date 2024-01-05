import { Text, Box, ErrorState, GlobalLoader, EmptyState, Picture, Carousel } from "@/ui";
import type { SeeAttractionDetailsModalProps } from "./see-attraction-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button, Divider, Grid, Icon, Label, LabelVariants, RatingStar } from "mars-ds";
import { TripScriptsApiService } from "@/services/api";
import { AttractionDetail } from "@/core/types";
import useSWR from "swr";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

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
        <Grid columns={{sm: 2, md: 4}}>
          {data.ratings && data.ratings.map((rating, index) => (
            <Label key={index} variant={(rating.rating >= 3.8 ? LabelVariants.Success : (rating.rating <= 1.0 ? LabelVariants.Error : LabelVariants.Warning))}>
              {rating.feature}
            </Label>
          ))}
        </Grid>
        <Text className="see-attraction-details-modal__header__subtitle">
          {data.tags}
        </Text>
      </Box>
      <Box className="see-attraction-details-modal__body">
        {data.images?.length && data.images.length > 0 ? (
            <Carousel height={300}>
              {data.images.map((image, key) => (
                <Picture
                  key={key}
                >
                  {parsePhoto(image)}
                </Picture>
              ))}
            </Carousel>
          ) : (<></>)}
        {data.images?.length && data.images.length > 0 && data.description ? <Divider style={{margin: "16px 0"}} /> : <></>}
        {data.description && (
          <>
            <Text size="xxl" className="see-attraction-details-modal__body__title">
              Informações
            </Text>
            <Text className="see-attraction-details-modal__body__description">
              {data.description}
            </Text>
          </>
        )}
      </Box>
      <Divider />
      <Box className="see-attraction-details-modal__info-list">
        {data.availabilityInfo && (
          <div className="see-attraction-details-modal__info-list__item">
            <Icon size="sm" color="var(--color-brand-3)" name="clock" />
            <Text size="md">{data.availabilityInfo}</Text>
          </div>
        )}
        {data.restrictions && (
          <div className="see-attraction-details-modal__info-list__item">
            <Icon size="sm" color="var(--color-brand-3)" name="lock" />
            <Text size="md">{data.restrictions}</Text>
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
