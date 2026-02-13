import { ApiRequest } from "@/services/api/request";

export interface SubscriptionsResponse {
  max: number;
  available: number;
}

export const getSubscriptions = async (): Promise<SubscriptionsResponse> => {
  const route = "customers/subscriptions";
  return ApiRequest.get<SubscriptionsResponse>(route);
};
