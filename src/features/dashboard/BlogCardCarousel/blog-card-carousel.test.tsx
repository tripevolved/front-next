import type { BlogCardCarouselProps } from "./blog-card-carousel.types";
import { render } from "@testing-library/react";
import { BlogCardCarousel } from "./blog-card-carousel.component";

const makeSut = (props?: BlogCardCarouselProps) => render(<BlogCardCarousel {...props} />);

describe("<BlogCardCarousel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
