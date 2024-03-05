import { Card, CardElevations, Divider, Grid } from "mars-ds";
import { Picture, Text, NotificationBadge } from "@/ui";
import type { CardNotificationProps } from "./card-notification.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { toFullDetailedDate } from "@/utils/helpers/dates.helpers";

export function CardNotification({
  className,
  children,
  sx,
  notification,
  ...props
}: CardNotificationProps) {
  const cn = makeCn("card-notification", className)(sx);

  return (
    <Card className={cn} {...props} elevation={CardElevations.Medium}>
      <Grid columns={["40px", "auto"]} className="gap-lg">
        <Picture className="w-100" src="/assets/trip-notifications/lamp.svg" />
        <Grid gap={8}>
          <NotificationBadge type={notification?.type} text="Suas viagens" />
          {/** @ts-ignore */}
          <Text heading size="xxs" className="color-text-secondary font-bold">
            {notification.title}
          </Text>
          <Divider />
          <Text className="card-notification__datetime">
            {toFullDetailedDate(notification.date)}
          </Text>
        </Grid>
      </Grid>
    </Card>
  );
}
