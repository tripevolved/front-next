import { ApiRequest } from "@/services/api/request";

export interface IntentCardRequest {
  transactionId: string;
  cardNumber: string;
}

export interface IntentCardResponse {
  token: string;
  paymentMethodId: string;
}

export interface IntentFinishRequest {
  transactionId: string;
  name: string;
  cardToken: string;
  securityCode: string;
  expirationMonth: number;
  expirationYear: number;
  ipAddress?: string;
  paymentMethodId: string;
}

export interface IntentFinishResponse {
  isSuccess: boolean;
  message: string | null;
}

export const postIntentCard = async (
  transactionId: string,
  cardNumber: string
): Promise<IntentCardResponse> => {
  const route = "payments/intent/card";
  return ApiRequest.post<IntentCardResponse>(route, { transactionId, cardNumber });
};

export const postIntentFinish = async (
  body: IntentFinishRequest
): Promise<IntentFinishResponse> => {
  const route = "payments/intent/finish";
  return ApiRequest.post<IntentFinishResponse>(route, body);
};
