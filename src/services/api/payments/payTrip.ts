import { TripPayment, TripPaymentMethod, TrippaymentProvider } from "@/core/types";
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
  provider: TrippaymentProvider;
  paymentMethod: TripPaymentMethod;
  pixInfo: PixPaymentInfo;
  paymentLinkUrl: string;
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
