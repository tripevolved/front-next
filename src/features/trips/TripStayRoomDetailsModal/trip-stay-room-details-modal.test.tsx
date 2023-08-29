import type { TripStayRoomDetailsModalProps } from "./trip-stay-room-details-modal.types";
import { render } from "@testing-library/react";
import { TripStayRoomDetailsModal } from "./trip-stay-room-details-modal.component";

const makeSut = (props?: TripStayRoomDetailsModalProps) => render(<TripStayRoomDetailsModal {...props} />);

describe("<TripStayRoomDetailsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
