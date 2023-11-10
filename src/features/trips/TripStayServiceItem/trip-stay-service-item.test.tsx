import type { TripStayServiceItemProps } from "./trip-stay-service-item.types";
import { render } from "@testing-library/react";
import { TripStayServiceItem } from "./trip-stay-service-item.component";

const makeSut = (props?: TripStayServiceItemProps) =>
  render(<TripStayServiceItem title="fake_title" type="wifi" {...props} />);

describe("<TripStayServiceItem>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
