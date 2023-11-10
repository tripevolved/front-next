import type { PageTripProps } from "./page-trip.types";
import { render } from "@testing-library/react";
import { PageTrip } from "./page-trip.component";

const FAKE_PROPS: PageTripProps = {
  children: "FAKE_CHILDREN",
};

const makeSut = (props?: PageTripProps) => render(<PageTrip {...FAKE_PROPS} {...props} />);

describe("<PageTrip>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
