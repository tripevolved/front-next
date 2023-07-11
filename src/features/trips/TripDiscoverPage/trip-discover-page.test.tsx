import { render } from "@testing-library/react";
import { TripDiscoverPage } from "./trip-discover-page.component";
import { TripDiscoverStepProps } from "./trip-discover-page.types";

const makeSut = (props?: TripDiscoverStepProps) => render(<TripDiscoverPage {...props} />);

describe("<TripDiscoverPage>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
