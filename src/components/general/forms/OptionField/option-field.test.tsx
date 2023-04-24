import type { OptionFieldProps } from "./option-field.types";
import { render } from "@testing-library/react";
import { OptionField } from "./option-field.component";

const makeSut = (props?: OptionFieldProps) => render(<OptionField {...props} />);

describe("<OptionField>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
