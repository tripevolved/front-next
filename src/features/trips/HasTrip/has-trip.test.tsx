import type { HasTripProps } from "./has-trip.types";
import { render } from "@testing-library/react";
import { HasTrip } from "./has-trip.component";
import { TripProposal } from "@/core/types";

const mockTest: TripProposal = {
  mainChoice: {
    destinationId: "6s65dg4sdg6s",
    price: 995.56,
    isYourChoice: true,
    name: "Ouro Preto",
    matchScore: 0.89,
    uniqueName: "ouro-preto",
    images: [],
  },
};

const makeSut = (props?: HasTripProps) => render(<HasTrip {...props} trip={mockTest} />);

describe("<HasTrip>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
