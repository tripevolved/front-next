import type { CardNotificationProps } from "./card-notification.types";
import { render } from "@testing-library/react";
import { CardNotification } from "./card-notification.component";

const makeSut = (props?: CardNotificationProps) =>
  render(
    <CardNotification
      {...props}
      notification={{
        date: new Date(),
        description: "description",
        id: "noi8f7sy0f89",
        status: "PENDING",
        subtitle: "subtitle",
        title: "title",
        tripDocumentId: "iuhd983",
        tripId: "oiuhd908q7",
        tripPendingActionId: "now987ghf0w",
        tripTipId: "n098ao7y0f9a",
        type: "TRIP",
      }}
    />
  );

describe("<CardNotification>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
