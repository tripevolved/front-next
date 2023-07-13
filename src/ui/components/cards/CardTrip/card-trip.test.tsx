import type { CardTripProps } from "./card-trip.types";
import { render } from "@testing-library/react";
import { CardTrip } from "./card-trip.component";

const makeSut = (props?: CardTripProps) => render(<CardTrip {...props} />);

describe("<CardTrip>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
