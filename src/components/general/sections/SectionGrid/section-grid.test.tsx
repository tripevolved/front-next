import type { SectionGridProps } from "./section-grid.types";
import { render } from "@testing-library/react";
import { SectionGrid } from "./section-grid.component";

const makeSut = (props?: SectionGridProps) => render(<SectionGrid {...props} />);

describe("<SectionGrid>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
