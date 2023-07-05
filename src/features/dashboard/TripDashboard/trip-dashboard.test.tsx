import type { TripDashboardProps } from "./trip-dashboard.types";
import { render } from "@testing-library/react";
import { TripDashboard } from "./trip-dashboard.component";

const makeSut = (props?: TripDashboardProps) => render(<TripDashboard {...props} />);

describe("<TripDashboard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
