import type { ConfirmFlightModalProps } from "./confirm-flight-modal.types";
import { render } from "@testing-library/react";
import { ConfirmFlightModal } from "./confirm-flight-modal.component";

const makeSut = (props?: ConfirmFlightModalProps) => render(<ConfirmFlightModal {...props} />);

describe("<ConfirmFlightModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
