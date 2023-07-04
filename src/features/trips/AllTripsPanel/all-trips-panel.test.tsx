import type { AllTripsPanelProps } from "./all-trips-panel.types";
import { render } from "@testing-library/react";
import { AllTripsPanel } from "./all-trips-panel.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();
const makeSut = (props?: AllTripsPanelProps) => render(<AllTripsPanel {...props} />);

describe("<AllTripsPanel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
