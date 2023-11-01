import { CardRestaurant, type StepComponentProps } from "@/features";
import { Button, Grid, Loader, Modal, Notification } from "mars-ds";
import { Box, ErrorState, NotificationResult, Text } from "@/ui";
import { RestaurantsApiService } from "@/services/api";
import useSwr from "swr";
import { Restaurant, RestaurantChoice, RestaurantChoiceType } from "@/core/types";
import { useRef } from "react";
import { useIdParam } from "@/utils/hooks/param.hook";

export const RestaurantList = ({ onNext }: StepComponentProps) => {
  const idParam = useIdParam();
  const tripId = String(idParam);

  const fetcher = async () => RestaurantsApiService.getRestaurants(tripId);
  const fetcherKey = idParam ? `restaurant-list-${idParam}` : null;
  const { isLoading, data, error } = useSwr<Restaurant[]>(fetcherKey, fetcher);

  const choice = useRef<RestaurantChoice[]>([]);

  const openErrorModal = (message: string) => {
    Modal.open(
      () => (
        <>
          <NotificationResult
            isSuccess={false}
            nonSuccessTitle="Não foi possível salvar suas escolhas de restaurantes"
            nonSuccessSubtitle={message}
            nonSuccessAllowSkip={true}
            nonSuccessSkipOnClick={onNext}
          />
        </>
      ),
      {
        size: "lg",
        closable: true,
      }
    );
  };

  const handleFinish = async () => {
    try {
      const result = await RestaurantsApiService.setRestaurantChoices(tripId, choice.current);

      if (result.isSuccess) {
        onNext();
      } else {
        openErrorModal(
          result.message ?? "Devido à um erro não foi possível salvar os restaurantes selecionados."
        );
      }
    } catch (error) {
      Notification.error("Devido à um erro não foi possível salvar os restaurantes selecionados.");
    }
  };

  const handleChoice = (restaurantId: string, choiceType: RestaurantChoiceType) => {
    if (choice.current.length > 0) {
      const foundRestaurant = choice.current.find((x) => x.restaurantId === restaurantId);
      if (!foundRestaurant) {
        choice.current = [...choice.current, { restaurantId, type: choiceType }];
      } else {
        const index = choice.current.indexOf(foundRestaurant);
        choice.current[index] = { restaurantId, type: choiceType };
      }
    } else {
      choice.current = [...choice.current, { restaurantId, type: choiceType }];
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
    <Grid gap={16} className="restaurant-list">
      <Text size="sm" heading as="p" className="restaurant-list__title">
        Dicas de restaurantes
      </Text>
      <Text size="md" as="p" className="color-text-primary">
        Confira nossas indicações e curta as opções que quiser incluir no roteiro
      </Text>
      <Box className="restaurant-list__info">
        {data.map((restaurant, index) => (
          <CardRestaurant restaurant={restaurant} key={index} onChoice={handleChoice} />
        ))}
      </Box>
      <Button onClick={handleFinish}>Salvar</Button>
    </Grid>
  );
};
