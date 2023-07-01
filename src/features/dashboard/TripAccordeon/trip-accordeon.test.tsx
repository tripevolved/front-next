import type { TripAccordeonProps } from "./trip-accordeon.types";
import { render } from "@testing-library/react";
import { TripAccordeon } from "./trip-accordeon.component";

const makeSut = (props?: TripAccordeonProps) => render(<TripAccordeon {...props} />);

describe("<TripAccordeon>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
