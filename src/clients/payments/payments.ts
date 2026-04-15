import type { PaymentIntent, PaymentIntentResponse } from "@/core/types/payments";
import { ApiRequest } from "@/services/api/request";

export type PaymentStatus = "APPROVED" | "PENDING" | "REFUSED" | "CANCELED";

export type CheckoutPaymentItemType =
  | "ACCOMMODATION"
  | "SUBSCRIPTION_ESSENTIAL"
  | "SUBSCRIPTION_TOTAL";

export type CheckoutPaymentType = "ON_BOOKING" | "REGULAR";

export interface CheckoutPaymentItemResponse {
  amount: number;
  domainId: string;
  type: CheckoutPaymentItemType;
  paymentType: CheckoutPaymentType;
}

export interface PaymentStatusResponse {
  id: string;
  status: PaymentStatus;
  statusReason: string | null;
  tripId: string | null;
  items: CheckoutPaymentItemResponse[];
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

export const getCheckoutPaymentById = async (id: string): Promise<PaymentStatusResponse> => {
  const route = `payments/${id}`;
  return ApiRequest.get<PaymentStatusResponse>(route);
};
