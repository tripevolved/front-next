import type { OptionsFieldListProps } from "./options-field-list.types";
import { render } from "@testing-library/react";
import { OptionsFieldList } from "./options-field-list.component";

const makeSut = (props?: OptionsFieldListProps) => render(<OptionsFieldList {...props} />);

describe("<OptionsFieldList>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
