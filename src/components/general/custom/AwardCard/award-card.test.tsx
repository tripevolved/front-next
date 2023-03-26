import type { AwardCardProps } from "./award-card.types";
import { render } from "@testing-library/react";
import { AwardCard } from "./award-card.component";

const makeSut = (props?: AwardCardProps) => render(<AwardCard {...props} />);

describe("<AwardCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
