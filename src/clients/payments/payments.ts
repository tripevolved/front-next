import type { PaymentIntent, PaymentIntentResponse } from "@/core/types/payments";
import { ApiRequest } from "@/services/api/request";

export type PaymentStatus = "APPROVED" | "PENDING" | "REFUSED" | "CANCELED";

export interface PaymentStatusResponse {
  transactionId: string;
  status: PaymentStatus;
  statusReason: string | null;
}

export const createPaymentIntent = async (
  paymentIntent: PaymentIntent
): Promise<PaymentIntentResponse> => {
  const route = "payments/intent";
  return ApiRequest.post<PaymentIntentResponse>(route, paymentIntent);
};

export const getPaymentByTransactionId = async (
  transactionId: string
): Promise<PaymentStatusResponse> => {
  const route = `payments/${transactionId}`;
  return ApiRequest.get<PaymentStatusResponse>(route);
};
