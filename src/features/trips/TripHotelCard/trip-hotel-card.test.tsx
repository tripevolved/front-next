import type { TripHotelCardProps } from "./trip-hotel-card.types";
import { render } from "@testing-library/react";
import { TripHotelCard } from "./trip-hotel-card.component";

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
      { url: "https://picsum.photos/1800/1300", altText: "Primeira imagem" },
      { url: "https://picsum.photos/1700/1200", altText: "Segunda imagem" },
      { url: "https://picsum.photos/1600/1100", altText: "Terceira imagem" },
    ],
    information:
      "Informação legal da acomodação. Vai ter muitos outros detalhes a mais pra pode completar o texto de informações e também preencher a tela",
    price: 67.09,
    currency: "R$",
    rooms: [],
  },
  id: "12kuj3h6244er",
  isSelected: true,
  name: "Alto mais Alto",
  tags: "3 estrelas",
};

const makeSut = (props?: TripHotelCardProps) =>
  render(<TripHotelCard tripStayData={mockData} {...props} />);

describe("<TripHotelCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
