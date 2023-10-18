import { type StepComponentProps } from "@/features";
import { Button, Grid, Loader, Notification } from "mars-ds";
import { Box, CardRestaurant, ErrorState, Text } from "@/ui";
import { RestaurantsApiService } from "@/services/api";
import { useRouter } from "next/router";
import useSwr from "swr";
import { Restaurant } from "@/core/types";

export const RestaurantList = ({ onNext }: StepComponentProps) => {
  const router = useRouter();
  const tripId = String(router.query.id);

  const uniqueKeyName = `${tripId}-restaurants`;
  const fetcher = async () => RestaurantsApiService.getRestaurants(tripId);
  const { isLoading, data, error } = useSwr<Restaurant[]>(uniqueKeyName, fetcher);

  const handleFinish = async () => {
    try {
      // TODO: save restaurants into script

      onNext();
    } catch (error) {
      Notification.error("Devido à um erro não foi possível salvar os restaurantes selecionados.");
    }
  };

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
    <Grid gap={16}>
      <Text size="sm" heading as="p" className="color-text-secondary">Dicas de restaurantes</Text>
      <Text size="md" as="p" className="color-text-primary">Confira nossas indicações e curta as opções que quiser incluir no roteiro</Text>
      <Box>
        {data.map((restaurant, index) => <CardRestaurant restaurant={restaurant} key={index} />)}
      </Box>
      <Button onClick={handleFinish}>Salvar</Button>
    </Grid>
  );
};