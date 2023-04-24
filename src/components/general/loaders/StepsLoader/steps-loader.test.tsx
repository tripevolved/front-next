import type { StepsLoaderProps } from "./steps-loader.types";
import { render } from "@testing-library/react";
import { StepsLoader } from "./steps-loader.component";

const makeSut = (props?: StepsLoaderProps) => render(<StepsLoader {...props} />);

describe("<StepsLoader>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
