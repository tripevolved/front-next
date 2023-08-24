import useSwr from "swr";

import { Loader, Button } from "mars-ds";
import { Box, CardHighlight, EmptyState, Picture, Text } from "@/ui";
import { TripStayHighlightSection } from "./trip-stay-highlight.section";
import { Modal } from "mars-ds";

import { StaysApiService } from "@/services/api";
import { TripStay } from "@/core/types";
import { TripStayDetailsModal } from "../TripStayDetailsModal";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = StaysApiService;

const mockData: TripStay = {
  coverImageUrl: "https://picsum.photos/50/",
  cancellationInfo: "Informação de cancelamento",
  isBuilding: false,
  isReserved: false,
  message: "Mensagem legal de Teste",
  reservationMessage: "Mensagem de reservação",
  details: {
    address: "Quadra QS 112",
    checkInHour: "8h às 20h",
    services: [
      { title: "Ar condicionado", type: "ac" },
      { title: "Boa cama", type: "bed" },
      { title: "Café da Manhã", type: "breakfast" },
      { title: "Wi-Fi", type: "wifi" },
    ],
    images: [
      { url: "https://picsum.photos/300/200", altText: "" },
      { url: "https://picsum.photos/400/300", altText: "" },
    ],
    information: "Informação legal da acomodação",
    price: 67.09,
    currency: "R$",
    rooms: [
      {
        coverImageUrl: "https://picsum.photos/300/200",
        details: { amenities: ["coisa", "nova", "teste"], information: "informação sensacional" },
        features: [{ title: "Feature daora", type: "legal" }],
        id: "i2u3g429",
        isSelected: true,
        price: 20.0,
        subtitle: "subtitulo",
        title: "titulo",
      },
      {
        coverImageUrl: "https://picsum.photos/300/200",
        details: { amenities: ["coisa", "nova", "teste"], information: "informação sensacional" },
        features: [{ title: "Feature daora", type: "legal" }],
        id: "i2u3g429",
        isSelected: true,
        price: 20.0,
        subtitle: "subtitulo",
        title: "titulo",
      },
    ],
  },
  highlight: {
    description: "Um ótimo lugar para quem gosta montanhas e grandes altitudes",
    title: "Nas Alturas",
    type: "comfort",
  },
  id: "12kuj3h6244er",
  isSelected: true,
  name: "Alto mais Alto",
  tags: "3 estrelas",
};

export const TripStaySection = ({ tripId }: { tripId: string }) => {
  const getStay = (key: string) => {
    return getByTripId(tripId);
  };

  const { data, error, isLoading } = useSwr("stay", getStay, swrOptions);

  const handleSeeDetails = () => {
    Modal.open(() => <TripStayDetailsModal stayData={mockData.details} />, {
      closable: true,
      size: "md",
    });
  };

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

  if (!mockData || !mockData.isSelected) {
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
            <Box className="trip-stay-section__header__edit">
              <Picture src="/assets/trip/pencil.svg" />
              Editar
            </Box>
          </Box>
          <Box className="trip-stay-section__content">
            <Box className="trip-stay-section__content__stay-desc">
              <Picture src={mockData.coverImageUrl!} />
              <Box className="trip-stay-section__content__stay-desc__box">
                <Text size="lg">{mockData.name}</Text>
                <Box className="trip-stay-section__content__stay-desc__box__stars">
                  {mockData.tags}
                </Box>
              </Box>
            </Box>
            <Button
              variant="naked"
              className="trip-stay-section__content__details-text"
              onClick={() => handleSeeDetails()}
            >
              Ver detalhes
            </Button>
          </Box>
          {mockData.highlight ? <TripStayHighlightSection highlight={mockData.highlight} /> : null}
        </Box>
      </div>
    </>
  );
};
