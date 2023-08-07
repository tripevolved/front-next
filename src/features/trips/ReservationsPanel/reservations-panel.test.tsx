import type { ReservationsPanelProps } from "./reservations-panel.types";
import { render } from "@testing-library/react";
import { ReservationsPanel } from "./reservations-panel.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();
const makeSut = (props?: ReservationsPanelProps) => render(<ReservationsPanel {...props} />);

describe("<AllTripsPanel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
