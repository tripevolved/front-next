import { getTripNotifications } from "./notifications";
import { readAllTripNotifications } from "./read-all";

export const NotificationApiService = {
  getTripNotifications,
  readAll: readAllTripNotifications,
};
