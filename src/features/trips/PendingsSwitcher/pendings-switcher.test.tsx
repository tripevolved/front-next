import type { PendingsSwitcherProps } from "./pendings-switcher.types";
import { render } from "@testing-library/react";
import { PendingSwitcher } from "./pendings-switcher.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();
const makeSut = (props?: PendingsSwitcherProps) => render(<PendingSwitcher {...props} />);

describe("<PendingsSwitcher>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
