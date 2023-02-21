import type { LeadListProps } from "./lead-list.types";

import { render } from "@testing-library/react";

import { LeadList } from "./lead-list.component";

const makeSut = (props?: LeadListProps) => render(<LeadList {...props} />);

describe("<LeadList>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
