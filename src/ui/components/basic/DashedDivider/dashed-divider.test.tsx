import type { DashedDividerProps } from "./dashed-divider.types";
import { render } from "@testing-library/react";
import { DashedDivider } from "./dashed-divider.component";

const makeSut = (props?: DashedDividerProps) => render(<DashedDivider {...props} />);

describe("<DashedDivider>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
