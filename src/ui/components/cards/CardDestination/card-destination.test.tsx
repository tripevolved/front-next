import type { CardDestinationProps } from "./card-destination.types";
import { render } from "@testing-library/react";
import { CardDestination } from "./card-destination.component";

const makeSut = (props?: CardDestinationProps) => render(<CardDestination {...props} />);

describe("<CardDestination>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
