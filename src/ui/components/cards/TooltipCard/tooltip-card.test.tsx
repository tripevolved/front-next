import type { TooltipCardProps } from "./tooltip-card.types";
import { render } from "@testing-library/react";
import { TooltipCard } from "./tooltip-card.component";

const FAKE_PROPS: TooltipCardProps = {
  text: "fake_text",
};

const makeSut = (props?: TooltipCardProps) => render(<TooltipCard {...FAKE_PROPS} {...props} />);

describe("<TooltipCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
