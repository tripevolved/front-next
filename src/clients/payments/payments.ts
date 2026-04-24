import type {
  PaymentCondition,
  PaymentIntent,
  PaymentIntentResponse,
  PaymentIntentStatusResponse,
} from "@/core/types/payments";
import { ApiRequest } from "@/services/api/request";

export type PaymentStatus = "APPROVED" | "PENDING" | "REFUSED" | "CANCELED";

export type CheckoutPaymentItemType =
  | "ACCOMMODATION"
  | "SUBSCRIPTION_ESSENTIAL"
  | "SUBSCRIPTION_TOTAL";

export type CheckoutPaymentType = "ON_BOOKING" | "REGULAR";

export interface CheckoutPaymentItemResponse {
  id: string;
  amount: number;
  amountInInstallments?: number;
  domainId: string;
  type: CheckoutPaymentItemType;
  paymentType: CheckoutPaymentType;
  status: "CREATED" | "IN_PAYMENT" | "PAID";
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

export const getIntentByTransactionId = async (
  transactionId: string
): Promise<PaymentIntentStatusResponse> => {
  const route = `payments/intent/${transactionId}`;
  return ApiRequest.post<PaymentIntentStatusResponse>(route, {});
};

export const getCheckoutPaymentById = async (id: string): Promise<PaymentStatusResponse> => {
  const route = `payments/${id}`;
  return ApiRequest.get<PaymentStatusResponse>(route);
};

export const getAccommodationPaymentConditions = async (
  tripId: string,
  tripAccommodationId: string
): Promise<PaymentCondition[]> => {
  const route = `payments/${tripId}/accommodations/${tripAccommodationId}/conditions`;
  return ApiRequest.get<PaymentCondition[]>(route);
};
