import { NotificationApiService } from "@/services/api";
import type { NotificationColumnProps } from "./notification-column.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import useSWR from "swr";
import { Grid, Skeleton, Link as MarsLink, Loader } from "mars-ds";
import { ErrorState, EmptyState, CardNotification, Box } from "@/ui";
import { useNotificationColumn } from "./notification-column.hook";
import { DropdownNotificationFilters } from "./dropdown-notification-filters.component";

export function NotificationColumn({ className, children, sx, ...props }: NotificationColumnProps) {
  const cn = makeCn("notification-column", className)(sx);

  const fetcher = async () => NotificationApiService.getTripNotifications();
  const { data, isLoading, error } = useSWR("get-all-user-notifications", fetcher);

  const { requestLoading, readAll } = useNotificationColumn();

  if (error) return <ErrorState />;
  if (isLoading) return <NotificationsLoadingState />;
  if (!data?.notifications) return <EmptyState />;

  return (
    <div className={`${cn} flex-column gap-lg`} {...props}>
      <Box className="flex justify-content-between">
        <div>
          <MarsLink className="notification-column__title">Notificações</MarsLink>
        </div>
        <div>
          <span className="notification-column__read-all" onClick={() => readAll()}>
            Marcar todas como lidas
          </span>
        </div>
        <DropdownNotificationFilters
          list={[
            {
              label: "Pendentes",
            },
            {
              label: "Lidas",
            },
            {
              label: "Ignoradas",
            },
          ]}
        />
      </Box>
      {requestLoading && (
        <div className="py-lg flex justify-content-center">
          <Loader color="var(--color-brand-1)" />
        </div>
      )}

      {data.notifications.map((notification, i) => (
        <CardNotification notification={notification} key={i} />
      ))}
    </div>
  );
}

const NotificationsLoadingState = () => (
  <Grid gap={10}>
    <div className="flex justify-content-between" style={{ height: 10 }}>
      <Skeleton active width={"40%"} />
      <Skeleton active width={"20%"} />
    </div>
    {[1, 2, 3, 4].map((_, key) => (
      <Skeleton active width={"100%"} height={180} key={key} />
    ))}
  </Grid>
);
