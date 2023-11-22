import type { TripHotelListProps } from "./trip-hotel-list.types";
import { render } from "@testing-library/react";
import { TripHotelList } from "./trip-hotel-list.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();

const FAKE_PROPS: TripHotelListProps = {
  tripId: "FAKE_TRIP_ID",
};

const makeSut = (props?: TripHotelListProps) =>
  render(<TripHotelList {...FAKE_PROPS} {...props} />);

describe("<TripHotelList>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
