import type { NotificationBadgeProps } from "./notification-badge.types";
import { render } from "@testing-library/react";
import { NotificationBadge } from "./notification-badge.component";

const makeSut = (props?: NotificationBadgeProps) => render(<NotificationBadge {...props} />);

describe("<NotificationBadge>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
