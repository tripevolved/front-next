import type { PageAppBodyProps } from "./page-app-body.types";
import { render } from "@testing-library/react";
import { PageAppBody } from "./page-app-body.component";

const makeSut = (props?: PageAppBodyProps) => render(<PageAppBody {...props} />);

describe("<PageAppBody>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
