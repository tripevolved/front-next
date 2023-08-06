import type { DatePickerProps } from "./date-picker.types";
import { render } from "@testing-library/react";
import { DatePicker } from "./date-picker.component";

const makeSut = (props?: DatePickerProps) => render(<DatePicker {...props} />);

describe("<DatePicker>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
