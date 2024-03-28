import type { ComponentHTMLProps } from "@/core/types";
import type { NotificationType as TripNotificationType } from "@/core/types";

export interface NotificationBadgeProps extends ComponentHTMLProps {
  text: string;
  type: TripNotificationType;
}
