import type {
  Notification as TripNotification,
  NotificationStatus as TripNotificationStatus,
} from "@/core/types";
import type { NotificationColumnProps } from "./notification-column.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Grid, Skeleton, Loader, Label, LabelThemes, LabelVariants, Modal } from "mars-ds";
import { ErrorState, EmptyState, CardNotification, Box, Text } from "@/ui";
import { useNotificationColumn } from "./notification-column.hook";
import { useState } from "react";
import { NotificationView } from "@/features";

const FILTER_OPTIONS = [
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
];

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
      onClose: () => {
        if (notification.status == "PENDING") readNotification(notification.id);
      },
    });
  };

  return (
    <div id="notification-column" className={`${cn} flex-column gap-lg`} {...props}>
      <Box className="flex justify-content-between gap-md">
        <div>
          <Text heading size="xs" className="notification-column__title color-primary">
            Notificações
          </Text>
        </div>
        <div className="flex text-right">
          <span className="notification-column__read-all" onClick={() => readAll()}>
            Marcar todas como lidas
          </span>
        </div>
      </Box>
      <FilterButtons
        selectFunction={(value: TripNotificationStatus | "") => setStatus(value)}
        selectedFilter={status}
      />
      {requestLoading ? (
        <div className="py-lg flex justify-content-center">
          <Loader color="var(--color-brand-1)" />
        </div>
      ) : null}

      {isLoading ? (
        <NotificationsLoadingState />
      ) : data?.notifications?.length ? (
        data.notifications.map((notification: TripNotification, i: number) => (
          <CardNotification
            notification={notification}
            key={i}
            onClick={() => handleNotificationView(notification)}
          />
        ))
      ) : (
        <NotificationsEmptyState status={status} />
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

const FilterButtons = ({
  selectedFilter,
  selectFunction,
}: {
  selectedFilter: TripNotificationStatus | "";
  selectFunction: (value: TripNotificationStatus | "") => void;
}) => {
  return (
    <div className="flex gap-md w-100">
      {FILTER_OPTIONS.map((opt, i) => (
        <Label
          style={{ cursor: "pointer" }}
          variant={LabelVariants.Primary}
          theme={opt.value == selectedFilter ? LabelThemes.Solid : LabelThemes.Ghost}
          key={i}
          onClick={() => {
            // @ts-ignore
            selectFunction(opt.value);
          }}
        >
          {opt.label}
        </Label>
      ))}
    </div>
  );
};

const NotificationsEmptyState = ({ status }: { status: TripNotificationStatus | "" }) => {
  const names: Record<TripNotificationStatus, string> = {
    PENDING: "Pendentes",
    IGNORED: "Ignoradas",
    READ: "",
  };

  return (
    <div className="notification-column__empty-state flex w-100 p-lg justify-content-center align-items-center">
      <Text size="lg" className="text-center">
        Você não possui notificações {status != "" && names[status]}
      </Text>
    </div>
  );
};
