import { render } from "@testing-library/react";
import { PublicDestinations } from "./public-destinations.component";

const makeSut = () => render(<PublicDestinations />);

describe("<PublicDestinations>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
