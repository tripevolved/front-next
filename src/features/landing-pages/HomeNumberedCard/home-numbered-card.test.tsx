import type { HomeNumberedCardProps } from "./home-numbered-card.types";

import { render } from "@testing-library/react";

import { HomeNumberedCard } from "./home-numbered-card.component";

const makeSut = (props?: HomeNumberedCardProps) => render(<HomeNumberedCard {...props} />);

describe("<HomeNumberedCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
