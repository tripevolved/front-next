import type { CategoryBadgeProps } from "./category-badge.types";
import { render } from "@testing-library/react";
import { CategoryBadge } from "./category-badge.component";

const FAKE_PROPS: CategoryBadgeProps = {
  color: "red",
  description: "fake_description",
};

const makeSut = (props?: CategoryBadgeProps) =>
  render(<CategoryBadge {...FAKE_PROPS} {...props} />);

describe("<CategoryBadge>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
