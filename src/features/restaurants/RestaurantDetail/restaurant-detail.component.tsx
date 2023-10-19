import { Button, Divider, Grid, Loader } from "mars-ds";
import { Box, ErrorState, Text } from "@/ui";
import { RestaurantsApiService } from "@/services/api";
import useSwr from "swr";
import { RestaurantDetail } from "@/core/types";

interface RestaurantDetailProps {
  restaurantId: string;
  onInclude: () => void;
  onDiscard: () => void;
}

export const RestaurantDetailComponent = ({ restaurantId, onInclude, onDiscard }: RestaurantDetailProps) => {
  const uniqueKeyName = `${restaurantId}-detail`;
  const fetcher = async () => RestaurantsApiService.getRestaurantDetail(restaurantId);
  const { isLoading, data, error } = useSwr<RestaurantDetail>(uniqueKeyName, fetcher);

  if (isLoading) {
    return (
      <Grid className="trip-script-builder-step">
        <Loader color="var(--color-brand-1)" size="md" />
      </Grid>
    );
  }

  if (error || !data) {
    return (
      <Grid className="trip-script-builder-step">
        <ErrorState />
      </Grid>
    );
  }

  return (
    <Grid gap={16} className="restaurant-detail">
      <Text size="sm" heading as="p" className="restaurant-detail__title">{data.name}</Text>
      <Text size="md" as="p" className="restaurant-detail__subtitle">{`${data.tags}${data.priceRange && ` - ${data.priceRange}`}`}</Text>
      {/* TODO: insert image carousel */}
      <Box className="restaurant-detail__info">
        <Text size="sm" heading as="p" className="restaurant-detail__info__title">Informações</Text>
        <Text size="md" as="p" className="restaurant-detail__info__description">{data.description}</Text>
        <Divider />
        <Text size="sm" heading as="p" className="restaurant-detail__hours">{data.functioningHoursDetail}</Text>
        <Text size="md" as="p" className="restaurant-detail__address">{data.address}</Text>
      </Box>
      <Button iconName="thumbs-up" onClick={onInclude} variant="primary">Incluir no roteiro</Button>
      <Button iconName="thumbs-down" onClick={onDiscard} variant="naked" size="sm">Descartar</Button>
    </Grid>
  );
};