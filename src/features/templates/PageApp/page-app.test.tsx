import type { PageAppProps } from "./page-app.types";
import { render } from "@testing-library/react";
import { PageApp } from "./page-app.component";

const makeSut = (props?: PageAppProps) => render(<PageApp {...props}>FAKE_CHILDREN</PageApp>);

describe("<PageApp>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
