import { render } from "@testing-library/react";
import { PageAppHeader } from "./page-app-header.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();

const makeSut = () => render(<PageAppHeader />);

describe("<PageAppMenu>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
