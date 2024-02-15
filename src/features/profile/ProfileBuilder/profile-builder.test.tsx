import type { ProfileBuilderProps } from "./profile-builder.types";
import { render } from "@testing-library/react";
import { ProfileBuilder } from "./profile-builder.component";

const makeSut = (props?: ProfileBuilderProps) => render(<ProfileBuilder {...props} />);

describe("<ProfileBuilder>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
