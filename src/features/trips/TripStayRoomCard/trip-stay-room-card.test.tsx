import type { TripStayRoomCardProps } from "./trip-stay-room-card.types";
import { render } from "@testing-library/react";
import { TripStayRoomCard } from "./trip-stay-room-card.component";

const FAKE_PROPS: TripStayRoomCardProps = {
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
  currency: "BRL",
  onClick: jest.fn(),
};

const makeSut = (props?: TripStayRoomCardProps) =>
  render(<TripStayRoomCard {...FAKE_PROPS} {...props} />);

describe("<TripStayRoomCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
