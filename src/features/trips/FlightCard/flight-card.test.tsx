import type { FlightCardProps } from "./flight-card.types";
import { render } from "@testing-library/react";
import { FlightCard } from "./flight-card.component";

const makeSut = (props?: FlightCardProps) => render(<FlightCard {...props} />);

describe("<FlightCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
