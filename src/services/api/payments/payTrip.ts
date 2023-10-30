import { TripPayment, TripPaymentMethod, TripPaymentStatus, TripPaymentProvider } from "@/core/types";
import { ApiRequest } from "@/services/api/request";
import { AxiosError } from "axios";

interface PixPaymentInfo {
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
      let errorMessage = "";
      if (error.response?.status === 500) errorMessage = "Houve um erro no seu pagamento.";
      else errorMessage = error.message;
      return { tripId: tripPayment.tripId, isSuccess: false, message: errorMessage };
    }
  );
  return paymentResult;
};

export const postTripPaymentIntent = async (tripPayment: TripPayment) => {
  const route = 'payments/intent/trip';
  const paymentResult = await ApiRequest.post<TripPaymentResult>(route, tripPayment);
  return paymentResult;
}

export const getTripPaymentStatus = async (tripId: string) => {
  const route = `/payments/${tripId}/status`;
  const result = await ApiRequest.get<TripPaymentStatusResult>(route);
  return result;
}
