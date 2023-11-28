import {
  TripPayment,
  TripPaymentMethod,
  TripPaymentStatus,
  TripPaymentProvider,
} from "@/core/types";
import { ApiRequest } from "@/services/api/request";
import { AxiosError } from "axios";

export interface PixPaymentInfo {
  qrCode: string;
  amount: number;
  netAmount: number;
  expirationDate: Date;
}

export interface TripPaymentResult {
  tripId: string;
  isSuccess: boolean;
  message: string | null;
  transactionId: string;
  provider: TripPaymentProvider;
  paymentMethod: TripPaymentMethod;
  pixInfo: PixPaymentInfo;
  paymentLinkUrl: string;
}

export interface TripPaymentStatusResult {
  tripId: string;
  status: TripPaymentStatus;
  message: string;
}

export const putTripPayment = async (tripPayment: TripPayment) => {
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

export const postTripPaymentIntent = async (tripPayment: TripPayment) => {
  const route = "payments/intent/trip";
  const paymentResult = await ApiRequest.post<TripPaymentResult>(route, tripPayment);
  return paymentResult;
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
