import type { AutoScrollNavProps } from "./auto-scroll-nav.types";

import { render } from "@testing-library/react";

import { AutoScrollNav } from "./auto-scroll-nav.component";

const makeSut = (props?: AutoScrollNavProps) => render(<AutoScrollNav {...props} />);

describe("<AutoScrollNav>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
