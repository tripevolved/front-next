import type { HasProfileProps } from "./has-profile.types";
import { render } from "@testing-library/react";
import { HasProfile } from "./has-profile.component";

const makeSut = (props?: HasProfileProps) => render(<HasProfile {...props} />);

describe("<HasProfile>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
