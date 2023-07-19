import { render } from "@testing-library/react";
import { PageAppMenu } from "./page-app-menu.component";

const makeSut = () => render(<PageAppMenu />);

describe("<PageAppMenu>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
