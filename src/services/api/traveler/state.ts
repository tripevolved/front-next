import { TravelerState } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getTravelerState = async () => {
  const route = `travelers/state`;
  const travelerState = await ApiRequest.get<TravelerState>(route);
  return travelerState;
};
