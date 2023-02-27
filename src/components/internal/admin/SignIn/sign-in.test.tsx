import type { SignInProps } from "./sign-in.types";
import { render } from "@testing-library/react";
import { SignIn } from "./sign-in.component";

const makeSut = (props?: SignInProps) => render(<SignIn {...props} />);

describe("<SignIn>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
