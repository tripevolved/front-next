import type { AuthSignInProps } from "./auth-sign-in.types";
import { render } from "@testing-library/react";
import { AuthSignIn } from "./auth-sign-in.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();

const makeSut = (props?: AuthSignInProps) => render(<AuthSignIn {...props} />);

describe("<AuthForm>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
