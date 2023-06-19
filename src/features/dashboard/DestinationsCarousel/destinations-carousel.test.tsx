import type { DestinationsCarouselProps } from "./destinations-carousel.types";
import { render } from "@testing-library/react";
import { DestinationsCarousel } from "./destinations-carousel.component";

const makeSut = (props?: DestinationsCarouselProps) => render(<DestinationsCarousel {...props} />);

describe("<DestinationsCarousel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
