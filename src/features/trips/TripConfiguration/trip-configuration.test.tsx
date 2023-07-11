import type { TripConfigurationProps } from "./trip-configuration.types";
import { render } from "@testing-library/react";
import { TripConfigurationSet } from "./trip-configuration.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

const makeSut = (props?: TripConfigurationProps) => {
  mockUseRouter();
  return render(<TripConfigurationSet {...props} />);
}

describe("<TripConfigurationSet>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
