import { NotificationApiService } from "@/services/api";
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

  return {
    requestLoading,
    setRequestLoading,
    readAll,
  };
};
