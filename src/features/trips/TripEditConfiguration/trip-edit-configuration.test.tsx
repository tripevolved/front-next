import type { TripEditConfigurationProps } from "./trip-edit-configuration.types";
import { render } from "@testing-library/react";
import { TripEditConfiguration } from "./trip-edit-configuration.component";

const FAKE_PROPS: TripEditConfigurationProps = {
  budget: 4000,
  endDate: "2023-12-01",
  numAdults: 2,
  startDate: "2023-11-25",
  tripId: "FAKE_TRIP_ID",
};

const makeSut = (props?: TripEditConfigurationProps) =>
  render(<TripEditConfiguration {...FAKE_PROPS} {...props} />);

describe("<TripEditConfiguration>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
