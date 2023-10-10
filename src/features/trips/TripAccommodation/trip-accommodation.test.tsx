import type { TripAccommodationProps } from "./trip-accommodation.types";
import { render } from "@testing-library/react";
import { TripAccommodation } from "./trip-accommodation.component";

import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();

const makeSut = (props?: TripAccommodationProps) => render(<TripAccommodation {...props} />);

describe("<TripAccommodation>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
