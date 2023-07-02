import type { HasTripProps } from "./has-trip.types";
import { render } from "@testing-library/react";
import { HasTrip } from "./has-trip.component";

const makeSut = (props?: HasTripProps) => render(<HasTrip {...props} />);

describe("<HasTrip>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
