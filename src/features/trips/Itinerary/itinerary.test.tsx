import type { ItineraryProps } from "./itinerary.types";
import { render } from "@testing-library/react";
import { Itinerary } from "./itinerary.component";

const makeSut = (props?: ItineraryProps) => render(<Itinerary {...props} />);

describe("<Itinerary>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
