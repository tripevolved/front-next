import { Button, Divider, Grid, Loader } from "mars-ds";
import { Box, Carousel, Emoji, ErrorState, Picture, Text } from "@/ui";
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
      <Text size="sm" heading as="h1" className="restaurant-detail__title">{data.name}</Text>
      <Text size="md" as="p" className="restaurant-detail__subtitle">{`${data.tags}${data.priceRange && ` - ${data.priceRange}`}`}</Text>
      {data.images?.length ? (
        <Carousel>
          {data.images.map((image, key) => (
            <Picture
              className="restaurant-detail__image"
              src={image.url}
              alt={image.alt ?? ""}
              key={key}
            />
          ))}
        </Carousel>
      ) : (
        <Picture
          style={{
            backgroundColor: "var(--color-brand-1)",
            display: "flex",
            justifyContent: "center",
          }}
          className="restaurant-detail__image"
          src={"/assets/blank-image.png"}
        />
      )}
      <Box className="restaurant-detail__info">
        <Text size="xl" as="h2" className="restaurant-detail__info__title">Informações</Text>
        <Text size="sm" as="p" className="restaurant-detail__info__description">{data.description}</Text>
        <Divider className="restaurant-detail__info__divider" />
        <Grid columns={[1,24]} className="restaurant-detail__info__subinfo">
          <Picture src="/assets/stays/time.png" />
          <Text size="md" as="p">{data.functioningHoursDetail}</Text>
        </Grid>
        <Grid columns={[1,24]} className="restaurant-detail__info__subinfo">
          <Picture src="/assets/stays/pin.png" />
          <Text size="md" as="p">{data.address}</Text>
        </Grid>
      </Box>
      <Button iconName="thumbs-up" onClick={onInclude} variant="primary" className="restaurant-detail__button">Incluir no roteiro</Button>
      <Button iconName="thumbs-down" onClick={onDiscard} variant="naked" size="sm" className="restaurant-detail__button">Descartar</Button>
    </Grid>
  );
};