import type { SquareSliderProps } from "./square-slider.types";
import { render } from "@testing-library/react";
import { SquareSlider } from "./square-slider.component";

const makeSut = (props?: SquareSliderProps) => render(<SquareSlider {...props} />);

describe("<SquareSlider>", () => {
  it.skip("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
