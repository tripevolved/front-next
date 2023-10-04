import "@/utils/mocks/Carousel.component.mock";

import type { TripStayDetailsProps } from "./trip-stay-details.types";

import { render } from "@testing-library/react";
import { TripStayDetails } from "./trip-stay-details.component";

const STAY_DATA_MOCK: TripStayDetailsProps["stayData"] = {
  address: "Quadra QS 112",
  checkInHour: "8h às 20h",
  services: [
    { title: "Ar condicionado", type: "ac" },
    { title: "Boa cama", type: "bed" },
    { title: "Café da Manhã", type: "breakfast" },
    { title: "Wi-Fi", type: "wifi" },
  ],
  images: [
    { url: "https://picsum.photos/300/200", altText: "Primeira imagem" },
    { url: "https://picsum.photos/400/300", altText: "Segunda imagem" },
    { url: "https://picsum.photos/500/400", altText: "Terceira imagem" },
  ],
  information: "Informação legal da acomodação",
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
};

const makeSut = () => render(<TripStayDetails stayData={STAY_DATA_MOCK} name="Teste" />);

describe("<TripStayDetailsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
