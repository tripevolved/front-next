import { render } from "@testing-library/react";
import { AuthPasswordConfirmation } from "./auth-password-confirmation.component";

const makeSut = () => render(<AuthPasswordConfirmation />);

describe("<AuthSignUpConfirmationPage>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
