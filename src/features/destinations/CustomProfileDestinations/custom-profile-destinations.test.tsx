import type { CustomProfileDestinationsProps } from "./custom-profile-destinations.types";
import { render } from "@testing-library/react";
import { CustomProfileDestinations } from "./custom-profile-destinations.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

const makeSut = (props?: CustomProfileDestinationsProps) => {
  mockUseRouter();
  return render(<CustomProfileDestinations {...props} />);
};

describe("<CustomProfileDestinations>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
