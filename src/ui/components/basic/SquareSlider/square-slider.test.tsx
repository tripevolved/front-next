import type { CarouselProps } from "./square-slider.types";
import { render } from "@testing-library/react";
import { Carousel } from "./square-slider.component";

const makeSut = (props?: CarouselProps) => render(<Carousel {...props} />);

describe("<Carousel>", () => {
  it.skip("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
