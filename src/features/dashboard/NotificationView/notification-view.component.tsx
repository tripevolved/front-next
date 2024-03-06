import { EmptyState, ErrorState, Text } from "@/ui";
import type { NotificationViewProps } from "./notification-view.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Divider, Grid, Skeleton } from "mars-ds";
import useSWR from "swr";
import { NotificationApiService } from "@/services/api";
import { toFullDetailedDate } from "@/utils/helpers/dates.helpers";

export function NotificationView({
  className,
  children,
  sx,
  notificationId,
  ...props
}: NotificationViewProps) {
  const cn = makeCn("notification-view", className)(sx);

  const fetcher = async () => NotificationApiService.getById(notificationId);
  const { data, isLoading, error } = useSWR(`get-notitification-by-id-${notificationId}`, fetcher);

  if (isLoading) return <NotificationLoadingState />;
  if (error) return <ErrorState />;
  if (!data) return <EmptyState />;

  return (
    <div className={cn} {...props}>
      <div className="notification-view__header flex-column gap-lg">
        <Text heading size="sm" className="notification-view__header__title">
          <strong>Notificação:</strong> {data.title}
        </Text>
        <Text size="md" className="notification-view__header__subtitle">
          {data.subtitle}
        </Text>
      </div>
      <div
        className="notification-view__content"
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
      <Divider />
      <Text className="notification-view__footer">{toFullDetailedDate(data.date)}</Text>
    </div>
  );
}

const NotificationLoadingState = () => (
  <Grid>
    <div className="w-100 mb-lg">
      <Skeleton active width="40%" height={20} />
      <Skeleton active width="70%" />
    </div>
    <Skeleton active width="100%" />
    <Skeleton active width="100%" />
    <Skeleton active width="100%" />
    <Skeleton active width="100%" />
    <Skeleton active width="100%" />
    <Skeleton active width="100%" />
    <Skeleton active width="100%" />
    <Skeleton active width="40%" />
    <div className="flex gap-lg">
      <Skeleton active width="20%" />
      <Skeleton active width="40%" />
    </div>
  </Grid>
);
