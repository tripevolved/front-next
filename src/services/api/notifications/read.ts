import { ApiRequest } from "../request";

export const readTripNotificationById = async (notificationId: string) => {
  const route = `/notifications/${notificationId}/read`;
  const tripNotifications = await ApiRequest.put(route, {});
  return tripNotifications;
};
