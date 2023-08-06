import type { SeeAttractionDetailsModalProps } from "./see-attraction-details-modal.types";
import { render } from "@testing-library/react";
import { SeeAttractionDetailsModal } from "./see-attraction-details-modal.component";

const makeSut = (props?: SeeAttractionDetailsModalProps) => render(<SeeAttractionDetailsModal {...props} />);

describe("<SeeAttractionDetailsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
