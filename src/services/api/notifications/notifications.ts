import type { Notification as TripNotification } from "@/core/types";
import { ApiRequest } from "../request";

export const getTripNotifications = async () => {
  const route = `/notifications`;
  const tripNotifications = await ApiRequest.get<TripNotification[]>(route);
  return tripNotifications;
};
