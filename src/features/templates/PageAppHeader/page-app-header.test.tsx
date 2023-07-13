import type { PageAppHeaderProps } from "./page-app-header.types";
import { render } from "@testing-library/react";
import { PageAppHeader } from "./page-app-header.component";

const makeSut = (props?: PageAppHeaderProps) => render(<PageAppHeader {...props} />);

describe("<PageAppHeader>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
