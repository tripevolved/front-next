import type { TripHotelCardProps } from "./trip-hotel-card.types";
import { render } from "@testing-library/react";
import { TripHotelCard } from "./trip-hotel-card.component";

const makeSut = (props?: TripHotelCardProps) => render(<TripHotelCard {...props} />);

describe("<TripHotelCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
