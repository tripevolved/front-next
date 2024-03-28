import { Text } from "@/ui";
import type { NotificationBadgeProps } from "./notification-badge.types";
import type { NotificationType as TripNotificationType } from "@/core/types";

import { makeCn } from "@/utils/helpers/css.helpers";

const typeColors = {
  NEWS: { title: "Novidades", color: "brand-4" },
  BLOG: { title: "Blog", color: "brand-3" },
  TRIP: { title: "Suas viagens", color: "brand-1" },
};

export function NotificationBadge({
  className,
  children,
  sx,
  text,
  type,
  ...props
}: NotificationBadgeProps) {
  const cn = makeCn("notification-badge", className)(sx);

  const notificationProp = typeColors[type];

  return (
    <div
      className={`${cn} px-sm py-xs`}
      {...props}
      style={{ border: `2pX solid var(--color-${notificationProp.color})` }}
    >
      <Text style={{ color: `var(--color-${notificationProp.color})` }}>
        {notificationProp.title}
      </Text>
    </div>
  );
}
