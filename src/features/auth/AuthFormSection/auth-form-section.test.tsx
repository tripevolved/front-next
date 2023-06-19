import type { AuthFormSectionProps } from "./auth-form-section.types";
import { render } from "@testing-library/react";
import { AuthFormSection } from "./auth-form-section.component";

const makeSut = (props?: AuthFormSectionProps) => render(<AuthFormSection {...props} />);

describe("<AuthFormSection>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
