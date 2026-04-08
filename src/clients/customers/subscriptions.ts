import { ApiRequest } from "@/services/api/request";

export interface SubscriptionsResponse {
  /** Price in whole BRL (e.g. 6700 for R$ 6.700,00) — assinatura com travel advisor. */
  priceWithTravelAdvisor: number;
  maxWithTravelAdvisor: number;
  availableWithTravelAdvisor: number;
  /** Price in whole BRL (e.g. 6700 for R$ 6.700,00) — assinatura sem travel advisor. */
  priceWithoutTravelAdvisor: number;
  maxWithoutTravelAdvisor: number;
  availableWithoutTravelAdvisor: number;
}

export const getSubscriptions = async (): Promise<SubscriptionsResponse> => {
  const route = "customers/subscriptions";
  return ApiRequest.get<SubscriptionsResponse>(route);
};
