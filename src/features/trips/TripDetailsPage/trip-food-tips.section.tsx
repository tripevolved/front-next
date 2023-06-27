import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { Grid, Caption, Loader, Button } from "mars-ds";
import { EmptyState, Box, Picture, Text } from "@/ui";

import { TransportationApiService } from "@/services/api/transportation";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

export const TripFoodTipsSection = () => {
  const { data = [], error, isLoading } = useSwr("transportation", getByTripId, swrOptions);

  if (isLoading) {
    return (
      <div className="profile-questions-form">
        <Loader color="var(--color-brand-1)" size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-questions-form flex-column gap-lg">
        <EmptyState />
        <Button variant="neutral" onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="trip-content-item">
      <Box>
        <Picture src={"/assets/destino/dicas-gastronomicas.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Dicas gastronômicas
        </Text>
        <Text className="trip-script-section__text" style={{ color: "$color-gray-1" }}>
          {
            "A gastronomia de Ouro Preto é uma deliciosa mistura da culinária mineira com influências da cozinha portuguesa. A cidade oferece uma variedade de pratos típicos e iguarias que agradam aos mais diversos paladares."
          }
        </Text>
      </Box>
    </div>
  );
};
