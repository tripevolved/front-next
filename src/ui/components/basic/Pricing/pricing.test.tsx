import type { PricingProps } from "./pricing.types";

import { render } from "@testing-library/react";

import { Pricing } from "./pricing.component";

const makeSut = (props?: PricingProps) => render(<Pricing {...props} />);

describe("<Pricing>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
