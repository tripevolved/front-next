import { ApiRequest } from "../request";

export const removeById = async (tripId: string) => {
  const route = `/trips/${tripId}/cancel`;
  await ApiRequest.delete(route);
};
