import type { PaymentIntent, PaymentIntentResponse } from "@/core/types/payments";
import { ApiRequest } from "@/services/api/request";

export const createPaymentIntent = async (
  paymentIntent: PaymentIntent
): Promise<PaymentIntentResponse> => {
  const route = "payments/intent";
  return ApiRequest.post<PaymentIntentResponse>(route, paymentIntent);
};
