import { LogoProps } from "./logo.types";

import { render } from "@testing-library/react";

import { Logo } from "./logo.component";

const makeSut = (props?: LogoProps) => render(<Logo {...props} />);

describe("<Logo>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
