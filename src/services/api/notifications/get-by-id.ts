import { ApiRequest } from "../request";
import type { Notification as TripNotification } from "@/core/types";

export const getTripNotificationById = async (notificationId: string) => {
  const route = `/notifications/${notificationId}`;
  const tripNotification = await ApiRequest.get<TripNotification>(route);
  return tripNotification;
};
