import type { IntroductionCardProps } from "./introduction-card.types";

import { render } from "@testing-library/react";

import { IntroductionCard } from "./introduction-card.component";

const makeSut = (props?: IntroductionCardProps) => render(<IntroductionCard {...props} />);

describe("<IntroductionCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
