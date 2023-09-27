import useSwr from "swr";

import { Loader, Button } from "mars-ds";
import { Box, CardHighlight, EmptyState, Picture, Text } from "@/ui";
import { TripStayHighlightSection } from "./trip-stay-highlight.section";

import { StaysApiService } from "@/services/api";
import { TripStay } from "@/core/types";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = StaysApiService;

const mockObject: TripStay = {
  id: "65sd4a651aset8hne3",
  cancellationInfo: "Informação de cancelamento",
  coverImageUrl: "https://picsum.photos/200",
  isBuilding: false,
  message: "Mensagem de Teste somente para MOck",
  reservationMessage: "Mensagem para reservas",
  name: "Lugar de Paz",
  isSelected: true,
};

export const TripStaySection = ({ tripId }: { tripId: string }) => {
  const getStay = (key: string) => {
    return getByTripId(tripId);
  };

  const { data, error, isLoading } = useSwr("stay", getStay, swrOptions);

  if (isLoading) {
    return (
      <div className="profile-questions-form">
        <Loader color="var(--color-brand-1)" size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="trip-content-item trip-stay-section">
        <Box>
          <Picture src={"/assets/destino/hospedagem.svg"} />
        </Box>
        <Box className="trip-content-item__desc">
          <Box className="trip-stay-section__header">
            <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
              Hospedagem
            </Text>
          </Box>
          <Box className="trip-stay-section__content">
            <EmptyState />
            <Button variant="neutral" onClick={() => location.reload()}>
              Tentar novamente
            </Button>
          </Box>
        </Box>
      </div>
    );
  }

  if (!mockObject || !mockObject.isSelected) {
    return (
      <>
        <div className="trip-content-item trip-stay-section">
          <Box>
            <Picture src={"/assets/destino/hospedagem.svg"} />
          </Box>
          <Box className="trip-content-item__desc">
            <Box className="trip-stay-section__header">
              <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
                Hospedagem
              </Text>
            </Box>
            <CardHighlight className="trip-stay-section__content">
              <div>
                <Text as="h2" size="lg">
                  Ainda não escolhemos a acomodação para sua viagem.
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
    <>
      <div className="trip-content-item trip-stay-section">
        <Box className="trip-stay-section__icon">
          <Picture src={"/assets/destino/hospedagem.svg"} />
        </Box>
        <Box className="trip-content-item__desc">
          <Box className="trip-stay-section__header">
            <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
              Hospedagem
            </Text>
            <Button
              iconName="edit-2"
              variant="naked"
              size="sm"
              style={{ color: "var(--color-gray-1)" }}
              href={`/app/viagens/criar/${tripId}/hospedagem`}
            >
              Editar
            </Button>
          </Box>
          <Box className="trip-stay-section__content">
            <Box className="trip-stay-section__content__stay-desc">
              <Picture src={mockObject.coverImageUrl!} style={{ height: 75, width: 75 }} />
              <Box className="trip-stay-section__content__stay-desc__box">
                <Text size="lg">{mockObject.name}</Text>
                <Box className="trip-stay-section__content__stay-desc__box__stars">
                  {mockObject.tags}
                </Box>
              </Box>
            </Box>
            <Button
              variant="naked"
              className="trip-stay-section__content__details-text"
              href={`/app/viagens/criar/${tripId}/hospedagem`}
            >
              Ver detalhes
            </Button>
          </Box>
          {mockObject.highlight ? (
            <TripStayHighlightSection highlight={mockObject.highlight} />
          ) : null}
        </Box>
      </div>
    </>
  );
};
