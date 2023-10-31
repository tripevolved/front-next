import type { FlightDetailsPainelProps } from "./flight-details-painel.types";
import { render } from "@testing-library/react";
import { FlightDetailsPainel } from "./flight-details-painel.component";

const makeSut = (props?: FlightDetailsPainelProps) => render(<FlightDetailsPainel {...props} />);

describe("<FlightDetailsPainel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
