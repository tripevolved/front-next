import type { HasCurrentTripProps } from "./has-current-trip.types";
import { render } from "@testing-library/react";
import { HasCurrentTrip } from "./has-current-trip.component";

const makeSut = (props?: HasCurrentTripProps) => render(<HasCurrentTrip {...props} />);

describe("<HasCurrentTrip>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
