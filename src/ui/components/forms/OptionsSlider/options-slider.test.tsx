import type { OptionsSliderProps } from "./options-slider.types";
import { render } from "@testing-library/react";
import { OptionsSlider } from "./options-slider.component";

const makeSut = (props?: OptionsSliderProps) => render(<OptionsSlider {...props} />);

describe("<OptionsSlider>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
