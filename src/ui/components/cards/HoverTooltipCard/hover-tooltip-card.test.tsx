import type { HoverTooltipCardProps } from "./hover-tooltip-card.types";
import { render } from "@testing-library/react";
import { HoverTooltipCard } from "./hover-tooltip-card.component";

const FAKE_PROPS: HoverTooltipCardProps = {
  text: "fake_text",
};

const makeSut = (props?: HoverTooltipCardProps) => render(<HoverTooltipCard {...FAKE_PROPS} {...props} />);

describe("<HoverTooltipCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
