import useSwr from "swr";

import { Loader, Button } from "mars-ds";
import { EmptyState, Box, Picture, Text } from "@/ui";

import { TransportationApiService } from "@/services/api";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

export const TripTransportationSection = ({tripId}: { tripId: string }) => {
  const getTransportation = (key: string) => {
    return getByTripId(tripId);
  };

  const { data, error, isLoading } = useSwr("transportation", getTransportation, swrOptions);

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
        <Picture src={"/assets/transportation/" + data.iconSlug + ".svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          {getTitleFromType(data.iconSlug)}
        </Text>
        <Box className="trip-transportation-section__transport">
          <Picture src={data.partnerLogoUrl} />
          <Box className="trip-transportation-section__transport__departure-and-arrival">
            <Text className="trip-transportation-section__transport__departure-and-arrival__text">
              {data.title}
            </Text>
            <Text className="trip-transportation-section__transport__departure-and-arrival__text">
              Saída: {data.departure}
            </Text>
            {data.estimatedArrival ? 
              <Text
                className="trip-transportation-section__transport__departure-and-arrival__text"
                style={{ marginTop: 0 }}
              >
                Chegada prevista: {data.estimatedArrival}
              </Text> : null
            }
          </Box>
          <Text>
            {data.description}
          </Text>
        </Box>
      </Box>
    </div>
  );
};

const getTitleFromType = (type: "car" | "flight" | "bus" | "train" | "rentalcar") => {
  if (type === "car") return "Carro";
  if (type === "flight") return "Passagem aérea";
  if (type === "bus") return "Passagem de ônibus";
  if (type === "train") return "Passagem de trem";
  if (type === "rentalcar") return "Aluguel de carro";

  return "Transporte";
};