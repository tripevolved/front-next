import type { NotificationResultProps } from "./notification-result.types";
import { render } from "@testing-library/react";
import { NotificationResult } from "./notification-result.component";

const makeSut = (props?: NotificationResultProps) => render(<NotificationResult isSuccess {...props} />);

describe("<NotificationResult>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
