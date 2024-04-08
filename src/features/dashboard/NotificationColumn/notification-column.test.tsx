import type { NotificationColumnProps } from "./notification-column.types";
import { render } from "@testing-library/react";
import { NotificationColumn } from "./notification-column.component";

const makeSut = (props?: NotificationColumnProps) => render(<NotificationColumn {...props} />);

describe("<NotificationColumn>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
