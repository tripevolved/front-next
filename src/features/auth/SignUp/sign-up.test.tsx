import type { AuthFormProps } from "./sign-up.types";
import { render } from "@testing-library/react";
import { SignUp } from "./sign-up.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();

const makeSut = (props?: AuthFormProps) => render(<SignUp {...props} />);

describe("<AuthForm>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
