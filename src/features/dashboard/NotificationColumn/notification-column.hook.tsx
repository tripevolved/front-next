import { NotificationApiService } from "@/services/api";
import type { Notification as TripNotification } from "@/core/types";
import { Notification as MarsNotification } from "mars-ds";
import { useState } from "react";
import useSWR from "swr";
import { TripNotificationsRequestParams } from "@/services/api/notifications/notifications";
import { useAppStore } from "@/core/store";

type UseNotificationColumnProps = TripNotificationsRequestParams;

export const useNotificationColumn = ({ status = "PENDING" }: UseNotificationColumnProps) => {
  const { user, setUser } = useAppStore((state) => state);

  const fetcher = async () =>
    NotificationApiService.getTripNotifications({ status })
      .then((data) => {
        const notification = data.notifications.find(
          (notification) => notification.status == "PENDING" || notification.status == "IGNORED"
        );
        setUser({ ...user, hasNotifications: notification ? true : false });
        return data;
      })
      .catch((e) => {
        MarsNotification.error("Erro ao buscar as notificações...");
        return e;
      });
  const { data, isLoading, error } = useSWR(`get-notifications-params-status-${status}`, fetcher);

  const [requestLoading, setRequestLoading] = useState(false);

  const readAll = () => {
    setRequestLoading(true);
    try {
      NotificationApiService.readAll()
        .then(() => MarsNotification.success("Todas as notificações foram lidas com sucesso!"))
        .finally(() => setRequestLoading(false));
    } catch (e) {
      MarsNotification.error("Erro ao ler as notificações...");
    }
  };

  return {
    data,
    isLoading,
    error,

    requestLoading,
    readAll,
  };
};
