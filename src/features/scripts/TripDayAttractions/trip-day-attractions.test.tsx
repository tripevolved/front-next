import type { TripDayAttractionsProps } from "./trip-day-attractions.types";
import { render } from "@testing-library/react";
import { TripDayAttractions } from "./trip-day-attractions.component";

const makeSut = (props?: TripDayAttractionsProps) => render(<TripDayAttractions {...props} />);

describe("<TripDayAttractions>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
