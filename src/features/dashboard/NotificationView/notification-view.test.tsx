import type { NotificationViewProps } from "./notification-view.types";
import { render } from "@testing-library/react";
import { NotificationView } from "./notification-view.component";

const makeSut = (props?: NotificationViewProps) => render(<NotificationView {...props} />);

describe("<NotificationView>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
