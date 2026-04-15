import { ApiRequest } from "@/services/api/request";
import type { CreateCheckoutPaymentRequest, CreateCheckoutPaymentResponse } from "@/core/types/payments";

/**
 * POST /payments
 * Creates a checkout payment and returns its id.
 */
export const createCheckoutPayment = async (
  body: CreateCheckoutPaymentRequest
): Promise<CreateCheckoutPaymentResponse> => {
  const route = "payments";
  return ApiRequest.post<CreateCheckoutPaymentResponse>(route, body);
};

