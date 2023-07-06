import useSwr from "swr";

import { Loader, Button } from "mars-ds";
import { EmptyState, Box, Picture, Text } from "@/ui";

import { TransportationApiService } from "@/services/api";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

export const TripTransportationSection = ({tripId}: { tripId: string }) => {
  const { data, error, isLoading } = useSwr(tripId, getByTripId, swrOptions);

  if (isLoading) {
    return (
      <div className="profile-questions-form">
        <Loader color="var(--color-brand-1)" size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="trip-content-item trip-transportation-section">
          <Box>
            <Picture src={"/assets/destino/passagem-aerea.svg"} />
          </Box>
          <Box className="trip-content-item__desc">
            <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
              Transporte
            </Text>
            <Box className="trip-transportation-section__transport">
              <Box className="trip-transportation-section__transport__departure-and-arrival">
                <EmptyState />
                <Button variant="neutral" onClick={() => location.reload()}>
                  Tentar novamente
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <div className="trip-content-item trip-transportation-section">
          <Box>
            <Picture src={"/assets/destino/passagem-aerea.svg"} />
          </Box>
          <Box className="trip-content-item__desc">
            <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
              Transporte
            </Text>
            <Box className="trip-transportation-section__transport">
              <div>
                <Text heading as="h4" size="xs">Ainda não escolhemos o transporte para sua viagem.</Text>
                <Text>Fale conosco e vamos deixar tudo como você deseja!</Text>
              </div>
            </Box>
          </Box>
        </div>
      </>
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
