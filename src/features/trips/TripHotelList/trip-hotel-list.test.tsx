import type { TripHotelListProps } from "./trip-hotel-list.types";
import { render } from "@testing-library/react";
import { TripHotelList } from "./trip-hotel-list.component";

const makeSut = (props?: TripHotelListProps) => render(<TripHotelList {...props} />);

describe("<TripHotelList>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
