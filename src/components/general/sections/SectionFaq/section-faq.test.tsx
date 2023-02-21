import type { SectionFaqProps } from "./section-faq.types";

import { render } from "@testing-library/react";

import { SectionFaq } from "./section-faq.component";

const makeSut = (props?: SectionFaqProps) => render(<SectionFaq {...props} />);

describe("<SectionFaq>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
