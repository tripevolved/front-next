import { TravelerState } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const travelerState = async () => {
  const route = `travelers/state`;
  const travelerState = await ApiRequest.post<TravelerState | null>(route, null);
  return travelerState;
};
