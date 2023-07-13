import type { NoCurrentTripProps } from "./no-current-trip.types";
import { render } from "@testing-library/react";
import { NoCurrentTrip } from "./no-current-trip.component";

const makeSut = (props?: NoCurrentTripProps) => render(<NoCurrentTrip {...props} />);

describe("<NoCurrentTrip>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
