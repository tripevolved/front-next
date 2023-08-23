import type { TripStayDetailsModalProps } from "./trip-stay-details-modal.types";
import { render } from "@testing-library/react";
import { TripStayDetailsModal } from "./trip-stay-details-modal.component";

const makeSut = (props?: TripStayDetailsModalProps) => render(<TripStayDetailsModal {...props} />);

describe("<TripStayDetailsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
