import { useRouter } from "next/router";
import type { TripAccommodationProps } from "./trip-accommodation.types";

import { StaysApiService } from "@/services/api";
import useSwr from "swr";
import { EmptyState, GlobalLoader, CardHighlight, Text } from "@/ui";
import { TripStayDetails } from "../TripStayDetails";
import type { TripStay } from "@/core/types";

const mockData: TripStay = {
  coverImageUrl: "https://picsum.photos/50/",
  cancellationInfo: "Informação de cancelamento",
  isBuilding: false,
  isReserved: false,
  message: "Mensagem legal de Teste",
  reservationMessage: "Mensagem de reservação",
  system: "okihb23onii",
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
      { url: "https://picsum.photos/1800/1300", altText: "Primeira imagem" },
      { url: "https://picsum.photos/1700/1200", altText: "Segunda imagem" },
      { url: "https://picsum.photos/1600/1100", altText: "Terceira imagem" },
    ],
    information:
      "Informação legal da acomodação. Vai ter muitos outros detalhes a mais pra pode completar o texto de informações e também preencher a tela",
    price: 67.09,
    currency: "R$",
    rooms: [
      {
        coverImageUrl: "https://picsum.photos/300/200",
        details: { amenities: ["coisa", "nova", "teste"], information: "informação sensacional" },
        features: [
          { title: "Wifi", type: "wifi" },
          { title: "Ar Condicionado", type: "ac" },
          { title: "Boa cama", type: "bed" },
        ],
        id: "i2u3g429",
        isSelected: true,
        price: 20.0,
        subtitle: "Acomoda 2 pessoas",
        title: "Suíte simples",
      },
      {
        coverImageUrl: "https://picsum.photos/300/200",
        details: { amenities: ["coisa", "nova", "teste"], information: "informação sensacional" },
        features: [{ title: "Ar Condicionado", type: "ac" }],
        id: "i2u3g429",
        isSelected: true,
        price: 20.0,
        subtitle: "acomoda 4 pessoas",
        title: "Suíte deluxe",
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

export function TripAccommodation() {
  const router = useRouter();
  const idParam = String(router.query.id);

  const fetcher = async () => StaysApiService.getByTripId(idParam);
  const { data, isLoading, error } = useSwr(`current-accomodation-${idParam}`, fetcher);

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (!data)
    return (
      <CardHighlight className="trip-stay-section__content">
        <div>
          <Text as="h2" size="lg">
            Ainda não escolhemos a acomodação para sua viagem.
          </Text>
          <Text>Fale conosco e vamos deixar tudo como você deseja!</Text>
        </div>
      </CardHighlight>
    );

  return (
    <div className="trip-accommodation">
      <TripStayDetails stayData={mockData.details} name={mockData.name} tripId={idParam} />
    </div>
  );
}
