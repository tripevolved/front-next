import type { ThumbnailCarouselProps } from "./thumbnail-carousel.types";
import { render } from "@testing-library/react";
import { ThumbnailCarousel } from "./thumbnail-carousel.component";

const makeSut = (props?: ThumbnailCarouselProps) => render(<ThumbnailCarousel {...props} />);

describe("<ThumbnailCarousel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
