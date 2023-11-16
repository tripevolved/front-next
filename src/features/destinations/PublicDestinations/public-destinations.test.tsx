import type { PublicDestinationsProps } from "./public-destinations.types";
import { render } from "@testing-library/react";
import { PublicDestinations } from "./public-destinations.component";

const makeSut = (props?: PublicDestinationsProps) => render(<PublicDestinations {...props} />);

describe("<PublicDestinations>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
