import { NotificationApiService } from "@/services/api";
import type { Notification as TripNotification } from "@/core/types";
import { Notification as MarsNotification } from "mars-ds";
import { useState } from "react";

export const useNotificationColumn = () => {
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

  const getNotifications = (param: TripNotification["status"]) => {
    setRequestLoading(true);
    try {
      NotificationApiService.getTripNotifications({ status: param }).finally(() =>
        setRequestLoading(false)
      );
    } catch (e) {
      MarsNotification.error("Erro ao buscar suas notificações...");
    }
  };

  return {
    requestLoading,
    setRequestLoading,
    readAll,
    getNotifications,
  };
};
