import { getTripNotifications } from "./notifications";
import { readAllTripNotifications } from "./read-all";
import { readTripNotificationById } from "./read";
import { getTripNotificationById } from "./get-by-id";

export const NotificationApiService = {
  getTripNotifications,
  readAll: readAllTripNotifications,
  readById: readTripNotificationById,
  getById: getTripNotificationById,
};
