import type { CategoryBadgeProps } from "./category-badge.types";
import { render } from "@testing-library/react";
import { CategoryBadge } from "./category-badge.component";

const makeSut = (props?: CategoryBadgeProps) => render(<CategoryBadge {...props} />);

describe("<CategoryBadge>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
