import { NotificationApiService } from "@/services/api";
import type { NotificationColumnProps } from "./notification-column.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import useSWR from "swr";
import { Grid, Skeleton, Link as MarsLink } from "mars-ds";
import { ErrorState, EmptyState, CardNotification, Box } from "@/ui";

export function NotificationColumn({ className, children, sx, ...props }: NotificationColumnProps) {
  const cn = makeCn("notification-column", className)(sx);

  const fetcher = async () => NotificationApiService.getTripNotifications();
  const { data, isLoading, error } = useSWR("get-all-user-notifications", fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <NotificationsLoadingState />;
  if (!data?.notifications) return <EmptyState />;

  return (
    <div className={`${cn} flex-column gap-lg`} {...props}>
      <Box className="flex justify-content-between">
        <div>
          <MarsLink>Notificações</MarsLink>
        </div>
        <div>
          <span className="notification-column__read-all">Marcar todas como lidas</span>
        </div>
      </Box>

      {data.notifications.map((notification, i) => (
        <CardNotification notification={notification} key={i} />
      ))}
    </div>
  );
}

const NotificationsLoadingState = () => (
  <Grid gap={10}>
    <div className="flax justify-space-between">
      <Skeleton width={"40%"} />
      <Skeleton width={"10%"} />
    </div>
    {[1, 2, 3, 4].map((_, key) => (
      <Skeleton width={"100%"} height={180} key={key} />
    ))}
  </Grid>
);
