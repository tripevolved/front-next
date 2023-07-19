import type { TripDiscoverStepsProps } from "./trip-discover-steps.types";
import { render } from "@testing-library/react";
import { TripDiscoverSteps } from "./trip-discover-steps";

const makeSut = (props?: TripDiscoverStepsProps) => render(<TripDiscoverSteps {...props} />);

describe("<TripDiscoverSteps>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
