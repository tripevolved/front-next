import type { TripDetailsPainelProps } from "./trip-details-painel.types";
import { render } from "@testing-library/react";
import { TripDetailsPainel } from "./trip-details-painel.component";

const makeSut = (props?: TripDetailsPainelProps) => render(<TripDetailsPainel {...props} />);

describe("<TripDetailsPainel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
