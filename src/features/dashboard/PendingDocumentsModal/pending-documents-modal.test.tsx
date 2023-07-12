import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";
import { render } from "@testing-library/react";
import { PendingDocumentsModal } from "./pending-documents-modal.component";

const makeSut = (props?: PendingDocumentsModalProps) => render(<PendingDocumentsModal {...props} />);

describe("<PendingDocumentsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
