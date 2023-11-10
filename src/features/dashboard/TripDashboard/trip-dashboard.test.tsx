import type { TripDashboardProps } from "./trip-dashboard.types";
import { render } from "@testing-library/react";
import { TripDashboard } from "./trip-dashboard.component";

const FAKE_PROPS: TripDashboardProps = {
  tripDashboard: { name: "", pendingActions: 1, status: "AWAITING_ACTION", attractionsNumber: 3 },
  tripId: "FAKE_TRIP_ID",
};

const makeSut = (props?: TripDashboardProps) =>
  render(<TripDashboard {...FAKE_PROPS} {...props} />);

describe("<TripDashboard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
