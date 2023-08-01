import type { TooltipCardProps } from "./tooltip-card.types";
import { render } from "@testing-library/react";
import { TooltipCard } from "./tooltip-card.component";

const makeSut = (props?: TooltipCardProps) => render(<TooltipCard {...props} />);

describe("<TooltipCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
