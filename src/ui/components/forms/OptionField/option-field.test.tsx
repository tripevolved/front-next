import type { OptionFieldProps } from "./option-field.types";
import { render } from "@testing-library/react";
import { OptionField } from "./option-field.component";

const FAKE_PROPS: OptionFieldProps = {
  value: "fake_value",
};

const makeSut = (props?: OptionFieldProps) => render(<OptionField {...FAKE_PROPS} {...props} />);

describe("<OptionField>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
