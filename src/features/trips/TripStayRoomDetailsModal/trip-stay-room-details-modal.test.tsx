import type { TripStayRoomDetailsModalProps } from "./trip-stay-room-details-modal.types";
import { render } from "@testing-library/react";
import { TripStayRoomDetailsModal } from "./trip-stay-room-details-modal.component";
import { TripStayRoom } from "@/core/types";

const mockRoom: TripStayRoom = {
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
};

const makeSut = (props?: TripStayRoomDetailsModalProps) =>
  render(<TripStayRoomDetailsModal {...props} room={mockRoom} />);

describe("<TripStayRoomDetailsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
