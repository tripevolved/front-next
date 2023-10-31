import { render } from "@testing-library/react";
import { PageAppHeader } from "./page-app-header.component";

const makeSut = () => render(<PageAppHeader />);

describe("<PageAppMenu>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
