import type { ButtonShareProps } from "./button-share.types";
import { render } from "@testing-library/react";
import { ButtonShare } from "./button-share.component";
import { makeUseRouter } from "@/helpers/tests/next-router.mock";

const makeSut = (props?: ButtonShareProps) => {
  makeUseRouter();
  return render(<ButtonShare {...props} />);
}

describe("<ButtonShare>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
