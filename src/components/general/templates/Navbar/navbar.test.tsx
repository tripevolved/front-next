import type { NavbarProps } from "./navbar.types";

import { render } from "@testing-library/react";

import { Navbar } from "./navbar.component";

const makeSut = (props?: NavbarProps) => render(<Navbar {...props} />);

describe("<Navbar>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
