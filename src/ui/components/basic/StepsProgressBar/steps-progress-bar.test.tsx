import type { StepsProgressBarProps } from "./steps-progress-bar.types";
import { render } from "@testing-library/react";
import { StepsProgressBar } from "./steps-progress-bar.component";

const makeSut = (props?: StepsProgressBarProps) => render(<StepsProgressBar {...props} />);

describe("<StepsProgressBar>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
