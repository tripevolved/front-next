import { ApiRequest } from "../request";

export const readAllTripNotifications = async () => {
  const route = `/notifications/read-all`;
  const tripNotifications = await ApiRequest.post(route, {});
  return tripNotifications;
};
