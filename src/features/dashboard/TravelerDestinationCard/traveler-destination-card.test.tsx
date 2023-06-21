import type { TravelerDestinationCardProps } from "./traveler-destination-card.types";
import { render } from "@testing-library/react";
import { TravelerDestinationCard } from "./traveler-destination-card.component";

const makeSut = (props?: TravelerDestinationCardProps) => render(<TravelerDestinationCard {...props} />);

describe("<TravelerDestinationCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
