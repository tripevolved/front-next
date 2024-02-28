import type { CardNotificationProps } from "./card-notification.types";
import { render } from "@testing-library/react";
import { CardNotification } from "./card-notification.component";

const makeSut = (props?: CardNotificationProps) => render(<CardNotification {...props} />);

describe("<CardNotification>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
