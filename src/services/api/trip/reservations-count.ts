import { ApiRequest } from "@/services/api/request";

export const getTripReservationsCountForDashboard = async (tripId: string) => {
  const route = `trips/${tripId}/reservation-count`;
  const count = await ApiRequest.get<number>(route);
  return count;
};
