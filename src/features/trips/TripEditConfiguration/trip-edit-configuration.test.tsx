import type { TripEditConfigurationProps } from "./trip-edit-configuration.types";
import { render } from "@testing-library/react";
import { TripEditConfiguration } from "./trip-edit-configuration.component";

const makeSut = (props?: TripEditConfigurationProps) => render(<TripEditConfiguration {...props} />);

describe("<TripEditConfiguration>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
