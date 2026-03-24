import { ApiRequest } from "@/services/api/request";

export interface SubscriptionsResponse {
  max: number;
  available: number;
  /** Price in whole BRL (e.g. 6700 for R$ 6.700,00) — assinatura com travel advisor. */
  priceWithTravelAdvisor: number;
}

export const getSubscriptions = async (): Promise<SubscriptionsResponse> => {
  const route = "customers/subscriptions";
  return ApiRequest.get<SubscriptionsResponse>(route);
};
