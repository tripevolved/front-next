import type { CheckoutPaymentItemResponse } from "@/clients/payments/payments";
import { ApiRequest } from "@/services/api/request";

export interface AcceptTermsRequest {
  travelerId: string;
  requestInformation: string;
  isServiceCondition: boolean;
  isUsageTerms: boolean;
  tripId?: string;
}

function isCirculoEvolvedItem(type: CheckoutPaymentItemResponse["type"]) {
  return type === "SUBSCRIPTION_TOTAL" || type === "SUBSCRIPTION_ESSENTIAL";
}

function isTripOrAccommodationItem(type: CheckoutPaymentItemResponse["type"]) {
  return type === "ACCOMMODATION";
}

export function buildAcceptTermsRequest(params: {
  travelerId: string;
  paymentId: string;
  tripId?: string | null;
  items: CheckoutPaymentItemResponse[];
}): AcceptTermsRequest | null {
  if (!params.travelerId || params.items.length === 0) return null;

  const hasCirculoEvolved = params.items.some((item) => isCirculoEvolvedItem(item.type));
  const hasTripOrAccommodation = params.items.some((item) => isTripOrAccommodationItem(item.type));

  const body: AcceptTermsRequest = {
    travelerId: params.travelerId,
    requestInformation: params.paymentId,
    isServiceCondition: hasCirculoEvolved,
    isUsageTerms: hasTripOrAccommodation,
  };

  if (params.tripId) {
    body.tripId = params.tripId;
  }

  return body;
}

/**
 * POST /terms
 * Records traveler acceptance of service conditions and/or usage terms.
 */
export const acceptTerms = async (body: AcceptTermsRequest): Promise<void> => {
  const route = "terms";
  await ApiRequest.post(route, body);
};
