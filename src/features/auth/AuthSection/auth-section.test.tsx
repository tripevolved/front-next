import type { AuthSectionProps } from "./auth-section.types";
import { render } from "@testing-library/react";
import { AuthSection } from "./auth-section.component";

const makeSut = (props?: AuthSectionProps) => render(<AuthSection {...props} />);

describe("<AuthSection>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
