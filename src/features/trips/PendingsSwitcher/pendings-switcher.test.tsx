import type { PendingsSwitcherProps } from "./pendings-switcher.types";
import { render } from "@testing-library/react";
import { PendingsSwitcher } from "./pendings-switcher.component";

const makeSut = (props?: PendingsSwitcherProps) => render(<PendingsSwitcher {...props} />);

describe("<PendingsSwitcher>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
