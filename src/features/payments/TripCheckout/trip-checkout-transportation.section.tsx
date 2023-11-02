import useSwr from "swr";

import { Loader, Button, Icon } from "mars-ds";
import { EmptyState, Box, Picture, Text, CardHighlight } from "@/ui";

import { TransportationApiService } from "@/services/api";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

export const TripCheckoutTransportationSection = ({ tripId, peopleInfo }: { tripId: string, peopleInfo: string }) => {
  const getTransportation = (key: string) => {
    return getByTripId(tripId);
  };

  const { data, error, isLoading } = useSwr("transportation", getTransportation, swrOptions);

  if (error || isLoading) {
    return (
      <div className="trip-content-item trip-transportation-section">
        <Box>
          <Picture src={"/assets/destino/passagem-aerea.svg"} />
        </Box>
        <Box className="trip-content-item__desc">
          <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
            Transporte
          </Text>
          <Box className="trip-transportation-section__transport__departure-and-arrival">
            {error && (
              <>
                <EmptyState />
                <Button variant="neutral" onClick={() => location.reload()}>
                  Tentar novamente
                </Button>
              </>
            )}
            {isLoading && (
              <div style={{textAlign: "center"}}>
                <Loader color="var(--color-brand-1)" size="md" />
              </div>
            )}
          </Box>
        </Box>
      </div>
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
        <Picture src={`/assets/transportation/${data.iconSlug}.svg`} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          {getTitleFromType(data.iconSlug)}
        </Text>
        <Box className="trip-checkout-transportation__container">
          {!data.isRouteFinished ? (
            <CardHighlight style={{ width: "100%", display: "flex", gap: 16 }}>
              <Text>Sua viagem não inclui o transporte.</Text>
            </CardHighlight>
          ) : (
            <>
              <Text size="lg">{peopleInfo}</Text>
              <CardHighlight className="trip-checkout-transportation__card">
                <Picture
                  src={data.partnerLogoUrl ?? "/assets/transportation/empty.svg"}
                  className="trip-checkout-transportation__card-logo"
                />
                <Box className="trip-transportation-section__transport__departure-and-arrival">
                  <div className="trip-transportation-section__transport__departure-and-arrival__item">
                    <Text size="xl">Saída: <span style={{fontWeight: "bold"}}>{data.fromName}</span></Text>
                    <Text size="xl">Chegada: <span style={{fontWeight: "bold"}}>{data.toName}</span></Text>
                  </div>
                </Box>
              </CardHighlight>
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
