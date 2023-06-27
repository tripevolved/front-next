import useSwr from "swr";

import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { Grid, Caption, Loader, Button } from "mars-ds";
import { EmptyState, Box, Picture, Text } from "@/ui";

import { TransportationApiService } from "@/services/api/transportation";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

export const TripTransportationSection = () => {
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
    <div className="trip-content-item trip-transportation-section">
      <Box>
        <Picture src={"/assets/destino/passagem-aerea.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Passagem aérea
        </Text>
        <Box className="trip-transportation-section__transport">
          <Picture src="/assets/latam.png" />
          <Box className="trip-transportation-section__transport__departure-and-arrival">
            <Text className="trip-transportation-section__transport__departure-and-arrival__text">
              Saída: {"Guarulhos - SP"}
            </Text>
            <Text
              className="trip-transportation-section__transport__departure-and-arrival__text"
              style={{ marginTop: 0 }}
            >
              Chegada: {"Confins - MG"}
            </Text>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
