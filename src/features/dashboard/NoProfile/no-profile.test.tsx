import type { NoProfileProps } from "./no-profile.types";
import { render } from "@testing-library/react";
import { NoProfile } from "./no-profile.component";

const makeSut = (props?: NoProfileProps) => render(<NoProfile {...props} />);

describe("<NoProfile>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
