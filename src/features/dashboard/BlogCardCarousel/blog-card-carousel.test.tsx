import type { BlogCardCarouselProps } from "./blog-card-carousel.types";
import { render } from "@testing-library/react";
import { BlogCardCarousel } from "./blog-card-carousel.component";

const FAKE_PROPS: BlogCardCarouselProps = {
  title: "FAKE_TITLE",
};

const makeSut = (props?: BlogCardCarouselProps) =>
  render(<BlogCardCarousel {...FAKE_PROPS} {...props} />);

describe("<BlogCardCarousel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
