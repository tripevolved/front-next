import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";
import { render } from "@testing-library/react";
import { PendingDocumentsModal } from "./pending-documents-modal.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();

const FAKE_TRIP_ID = "FAKE_TRIP_ID";
const makeSut = (props: PendingDocumentsModalProps) => render(<PendingDocumentsModal {...props} />);

describe("<PendingDocumentsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut({ tripId: FAKE_TRIP_ID });
    expect(wrapper).toBeTruthy();
  });
});
