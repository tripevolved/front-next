import type { NotificationButtonProps } from "./notification-button.types";
import { render } from "@testing-library/react";
import { NotificationButton } from "./notification-button.component";

const makeSut = (props?: NotificationButtonProps) => render(<NotificationButton {...props} />);

describe("<NotificationButton>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
