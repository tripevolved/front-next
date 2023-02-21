import type { FooterProps } from "./footer.types";

import { render } from "@testing-library/react";

import { Footer } from "./footer.component";

const makeSut = (props?: FooterProps) => render(<Footer {...props} />);

describe("<Footer>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
