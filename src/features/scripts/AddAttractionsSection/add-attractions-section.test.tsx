import type { AddAttractionsSectionProps } from "./add-attractions-section.types";
import { render } from "@testing-library/react";
import { AddAttractionsSection } from "./add-attractions-section.component";

const makeSut = (props?: AddAttractionsSectionProps) => render(<AddAttractionsSection tripId={props?.tripId!} onClickAttraction={props?.onClickAttraction!} {...props} />);

describe("<AddAttractionsModal>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
