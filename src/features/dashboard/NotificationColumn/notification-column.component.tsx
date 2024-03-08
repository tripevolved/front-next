import type { Notification as TripNotification } from "@/core/types";
import type { NotificationColumnProps } from "./notification-column.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Grid, Skeleton, Link as MarsLink, Loader, SelectField, Modal } from "mars-ds";
import { ErrorState, EmptyState, CardNotification, Box } from "@/ui";
import { useNotificationColumn } from "./notification-column.hook";
import { useState } from "react";
import { NotificationView } from "@/features";

export function NotificationColumn({ className, children, sx, ...props }: NotificationColumnProps) {
  const cn = makeCn("notification-column", className)(sx);
  const [status, setStatus] = useState<TripNotification["status"] | "">("PENDING");

  const { data, isLoading, error, readAll, requestLoading, readNotification } =
    useNotificationColumn({ status });

  if (error) return <ErrorState />;

  const handleNotificationView = (notification: TripNotification) => {
    Modal.open(() => <NotificationView notificationId={notification.id} />, {
      closable: true,
      size: "sm",
      onClose: () => readNotification(notification.id),
    });
  };

  return (
    <div id="notification-column" className={`${cn} flex-column gap-lg`} {...props}>
      <Box className="flex justify-content-between">
        <div>
          <MarsLink className="notification-column__title">Notificações</MarsLink>
        </div>
        <div>
          <span className="notification-column__read-all" onClick={() => readAll()}>
            Marcar todas como lidas
          </span>
        </div>
      </Box>
      <SelectField
        label="Filtro"
        onSelect={(e: any) => setStatus(e.value)}
        defaultValue={status}
        defaultOption={{
          label: "Pendentes",
          value: "PENDING",
        }}
        options={[
          {
            label: "Pendentes",
            value: "PENDING",
          },
          {
            label: "Lidas",
            value: "READ",
          },
          {
            label: "Ignoradas",
            value: "IGNORED",
          },
          {
            label: "Todos",
            value: "",
          },
        ]}
      />
      {requestLoading ? (
        <div className="py-lg flex justify-content-center">
          <Loader color="var(--color-brand-1)" />
        </div>
      ) : null}

      {isLoading ? (
        <NotificationsLoadingState />
      ) : data?.notifications.length ? (
        data.notifications.map((notification: TripNotification, i: number) => (
          <CardNotification
            notification={notification}
            key={i}
            onClick={() => handleNotificationView(notification)}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

const NotificationsLoadingState = () => (
  <Grid gap={10} style={{ height: "fit-content" }}>
    {[1, 2, 3, 4].map((_, key) => (
      <Skeleton active width={"100%"} height={180} key={key} />
    ))}
  </Grid>
);
