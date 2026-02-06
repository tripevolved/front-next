import {
  TripPaymentIntent,
  TripPaymentMethod,
  TripPaymentStatus,
  TripPaymentProvider,
  PixPaymentInfo,
} from "@/core/types";
import { ApiRequest } from "@/services/api/request";
import { AxiosError } from "axios";

export interface TripPaymentResult {
  tripId: string;
  isSuccess: boolean;
  message: string | null;
  transactionId: string;
  provider: TripPaymentProvider;
  paymentMethod: TripPaymentMethod;
  pixInfo: PixPaymentInfo | null;
  paymentLinkUrl: string;
}

export interface TripPaymentStatusResult {
  tripId: string;
  status: TripPaymentStatus;
  message: string;
}

export const putTripPayment = async (tripPayment: TripPaymentIntent) => {
  const route = "payments/trip";
  const paymentResult = await ApiRequest.put<TripPaymentResult>(route, tripPayment).catch(
    (error: AxiosError) => {
      const isServerError = error.response?.status === 500;
      const errorMessage = isServerError ? "Houve um erro no seu pagamento." : error.message;
      throw new Error(errorMessage);
    }
  );
  return paymentResult;
};

export const postTripPaymentIntent = async ({ creditCard, ...tripPayment }: TripPaymentIntent) => {
  const routeIntent = "payments/intent/trip";
  const skipCreditCard = !creditCard || tripPayment.method === "PIX";

  const paymentResult = await ApiRequest.post<TripPaymentResult>(routeIntent, tripPayment);
  if (skipCreditCard) return paymentResult;

  const { cardNumber } = creditCard;
  const routeCard = "payments/intent/card";
  const { token: cardToken, paymentMethodId } = await ApiRequest.post(routeCard, {
    cardNumber,
    tripId: tripPayment.tripId,
    transactionId: paymentResult.transactionId,
  });

  if (!cardToken) {
    throw new Error("Card token has not been created");
  }

  const routeFinish = "payments/intent/finish";
  const creditCardPaymentResult = await ApiRequest.post(routeFinish, {
    tripId: tripPayment.tripId,
    transactionId: paymentResult.transactionId,
    cardToken,
    name: creditCard.cardholder,
    securityCode: creditCard.securityCode,
    expirationMonth: creditCard.expirationMonth,
    expirationYear: creditCard.expirationYear,
    ipAddress: window.clientIp,
    paymentMethodId,
  });

  return creditCardPaymentResult;
};

export const getTripPaymentStatus = async (tripId: string) => {
  const route = `/payments/${tripId}/status`;
  try {
    const { status } = await ApiRequest.get<TripPaymentStatusResult>(route);

    if (status == "NOT_STARTED" || status == "STARTED") {
      return { error: false, success: false, finish: false, message: "Continue aguardando" };
    }
    if (status == "CANCELED") {
      return { error: true, message: "Pagamento Cancelado!", success: false, finish: true };
    }
    if (status == "REFUSED") {
      return { error: true, message: "Seu pagamento foi recusado!", success: false, finish: true };
    }
    return {
      error: false,
      message: "Pagamento aprovado com sucesso!",
      success: true,
      finish: true,
    };
  } catch (error) {
    return { error: true, success: false, finish: false, message: "Erro ao processar o pagamento" };
  }
};
