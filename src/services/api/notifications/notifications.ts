import type { Notification as TripNotification } from "@/core/types";
import { ApiRequest } from "../request";

export interface TripNotificationsResponse {
  notifications: TripNotification[];
  page: number;
  perPage: number;
  totalPages: number;
}

export const getTripNotifications = async () => {
  const route = `/notifications?status=&page=1`;
  const tripNotifications = await ApiRequest.get<TripNotificationsResponse>(route);
  return tripNotifications;
};
