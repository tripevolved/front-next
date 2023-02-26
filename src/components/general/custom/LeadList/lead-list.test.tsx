import type { LeadListProps } from "./lead-list.types";

import { render } from "@testing-library/react";
import { LeadList } from "./lead-list.component";

jest.mock("../LeadListForm/lead-list-form-logic.component.tsx", () => ({
  LeadListForm: () => {}
}))

const makeSut = (props?: LeadListProps) => render(<LeadList {...props} />);

describe("<LeadList>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
