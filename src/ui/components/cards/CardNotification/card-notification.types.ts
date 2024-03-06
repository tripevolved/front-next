import type { ComponentHTMLProps } from "@/core/types";
import type { Notification as TripNotification } from "@/core/types";

export interface CardNotificationProps extends ComponentHTMLProps {
  notification: TripNotification;
  onClick?: VoidFunction;
}
