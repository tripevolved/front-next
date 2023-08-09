import type { AddAttractionsModalProps } from "./add-attractions-modal.types";
import { render } from "@testing-library/react";
import { AddAttractionsModal } from "./add-attractions-modal.component";

const makeSut = (props?: AddAttractionsModalProps) => render(<AddAttractionsModal {...props} />);

describe("<AddAttractionsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
