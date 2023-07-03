import type { AuthForgotPasswordProps } from "./auth-forgot-password.types";
import { render } from "@testing-library/react";
import { AuthForgotPassword } from "./auth-forgot-password.component";

const makeSut = (props?: AuthForgotPasswordProps) => render(<AuthForgotPassword {...props} />);

describe("<AuthForgotPassword>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
