import useSwr from "swr";

import { Loader, Button, Icon } from "mars-ds";
import { EmptyState, Box, Picture, Text, CardHighlight } from "@/ui";

import { TransportationApiService } from "@/services/api";
import { TripTransportation } from "@/core/types";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

export const TripTransportationSection = ({ tripId }: { tripId: string }) => {
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

  if (!data || !data.isSelected) {
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
            <CardHighlight className="trip-transportation-section__transport">
              <div>
                <Text as="h2" size="lg">
                  Ainda não escolhemos o transporte para sua viagem.
                </Text>
                <Text>Fale conosco e vamos deixar tudo como você deseja!</Text>
              </div>
            </CardHighlight>
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
          {!data.isRouteFinished ? (
            <CardHighlight style={{ width: "100%", display: "flex", gap: 16 }}>
              <Text>{data.message}</Text>
            </CardHighlight>
          ) : (
            <>
              <Picture
                src={data.partnerLogoUrl}
                className="trip-transportation-section__transport__partner-logo"
              />
              <Box className="trip-transportation-section__transport__departure-and-arrival">
                {data.departure && (
                  <div className="trip-transportation-section__transport__departure-and-arrival__item">
                    <Text className="trip-transportation-section__transport__departure-and-arrival__item__date">
                      Saída: {data.departure}
                    </Text>
                    <Text
                      style={{ marginTop: 0 }}
                      className="trip-transportation-section__transport__departure-and-arrival__item__address"
                      size="sm"
                    >
                      {data.fromName} - {data.fromAddress}
                    </Text>
                  </div>
                )}
                {data.estimatedArrival ? (
                  <div className="trip-transportation-section__transport__departure-and-arrival__item">
                    <Text className="trip-transportation-section__transport__departure-and-arrival__item__date">
                      Chegada prevista: {data.estimatedArrival}
                    </Text>
                    <Text
                      size="sm"
                      style={{ marginTop: 0 }}
                      className="trip-transportation-section__transport__departure-and-arrival__item__address"
                    >
                      {data.toName} - {data.toAddress}
                    </Text>
                  </div>
                ) : null}
                {data.description && (
                  <div className="trip-transportation-section__transport__departure-and-arrival__item">
                    <Text style={{ color: "var(--color-gray-1)" }}>{data.description}</Text>
                  </div>
                )}
              </Box>
            </>
          )}
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
