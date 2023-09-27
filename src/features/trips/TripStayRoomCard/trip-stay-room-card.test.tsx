import type { TripStayRoomCardProps } from "./trip-stay-room-card.types";
import { render } from "@testing-library/react";
import { TripStayRoomCard } from "./trip-stay-room-card.component";

const makeSut = (props?: TripStayRoomCardProps) => render(<TripStayRoomCard {...props} />);

describe("<TripStayRoomCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
