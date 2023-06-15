import type { HeaderUserMenuProps } from "./header-user-menu.types";
import { render } from "@testing-library/react";
import { HeaderUserMenu } from "./header-user-menu.component";

const makeSut = (props?: HeaderUserMenuProps) => render(<HeaderUserMenu {...props} />);

describe("<HeaderUserMenu>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
