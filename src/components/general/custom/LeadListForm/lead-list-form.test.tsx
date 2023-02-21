import type { LeadListFormProps } from "./lead-list-form.types";

import { render } from "@testing-library/react";

import { LeadListForm } from "./lead-list-form.component";

const makeSut = (props?: LeadListFormProps) => render(<LeadListForm {...props} />);

describe("<LeadListForm>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
