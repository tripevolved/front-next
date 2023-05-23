import type { PageBaseProps } from "./page-base.types";

import { render } from "@testing-library/react";

import { PageBase } from "./page-base.component";

const makeSut = (props?: PageBaseProps) => render(<PageBase {...props} />);

describe("<PageBase>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
