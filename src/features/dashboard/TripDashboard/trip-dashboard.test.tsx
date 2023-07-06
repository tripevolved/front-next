import type { TripDashboardProps } from "./trip-dashboard.types";
import { render } from "@testing-library/react";
import { TripDashboard } from "./trip-dashboard.component";
import { TripDashboard as iTripDashboard } from "@/core/types";

const mockDashboard: iTripDashboard = {
  pedingActions: 0,
  attractionsNumber: 3,
  documents: 2,
  flightAndTickets: 4,
  tips: 9,
};

const makeSut = (props?: TripDashboardProps) =>
  render(<TripDashboard {...props} tripDashboard={mockDashboard} />);

describe("<TripDashboard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
