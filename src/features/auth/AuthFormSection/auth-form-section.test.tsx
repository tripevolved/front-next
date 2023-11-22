import type { AuthFormSectionProps } from "./auth-form-section.types";
import { render } from "@testing-library/react";
import { AuthFormSection } from "./auth-form-section.component";

const FAKE_PROPS: AuthFormSectionProps = {
  onSubmitHandler: jest.fn(),
  submitButton: jest.fn(),
  submitting: false,
};

const makeSut = (props?: AuthFormSectionProps) =>
  render(<AuthFormSection {...FAKE_PROPS} {...props} />);

describe("<AuthFormSection>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
