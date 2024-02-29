import type { Notification as TripNotification } from "@/core/types";
import { ApiRequest } from "../request";

export interface TripNotificationsRequestParams {
  status?: TripNotification["status"] | null;
  type?: TripNotification["type"] | null;
  page?: number;
}

export interface TripNotificationsResponse {
  notifications: TripNotification[];
  page: number;
  perPage: number;
  totalPages: number;
}

export const getTripNotifications = async ({
  status = "PENDING",
  type = null,
  page = 1,
}: TripNotificationsRequestParams) => {
  const route = `/notifications?status=${status}&type=${type}&page=${page}`;
  const tripNotifications = await ApiRequest.get<TripNotificationsResponse>(route);
  return tripNotifications;
};
