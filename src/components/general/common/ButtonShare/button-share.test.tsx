import type { ButtonShareProps } from "./button-share.types";
import { render } from "@testing-library/react";
import { ButtonShare } from "./button-share.component";

const makeSut = (props?: ButtonShareProps) => render(<ButtonShare {...props} />);

describe("<ButtonShare>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
