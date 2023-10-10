import type { TripStayRoomsListProps } from "./trip-stay-rooms-list.types";
import { render } from "@testing-library/react";
import { TripStayRoomsList } from "./trip-stay-rooms-list.component";

import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();

const makeSut = (props?: TripStayRoomsListProps) => render(<TripStayRoomsList {...props} />);

describe("<TripStayRoomsList>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
