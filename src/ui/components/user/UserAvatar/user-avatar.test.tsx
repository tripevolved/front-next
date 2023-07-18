import type { UserAvatarProps } from "./user-avatar.types";
import { render } from "@testing-library/react";
import { UserAvatar } from "./user-avatar.component";

const makeSut = (props?: UserAvatarProps) => render(<UserAvatar {...props} />);

describe("<UserAvatar>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
