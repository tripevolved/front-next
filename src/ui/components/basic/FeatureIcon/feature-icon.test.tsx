import type { FeatureIconProps } from "./feature-icon.types";
import { render } from "@testing-library/react";
import { FeatureIcon } from "./feature-icon.component";

const makeSut = (props?: FeatureIconProps) => render(<FeatureIcon {...props} />);

describe("<FeatureIcon>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
