import type { TripDetailsPanelProps } from "./trip-details-panel.types";
import { render } from "@testing-library/react";
import { TripDetailsPanel } from "./trip-details-panel.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();
const makeSut = (props?: TripDetailsPanelProps) => render(<TripDetailsPanel {...props} />);

describe("<TripDetailsPanel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
