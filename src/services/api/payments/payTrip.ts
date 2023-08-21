import { TripPayment } from "@/core/types";
import { ApiRequest } from "@/services/api/request";
import { AxiosError } from "axios";

export interface TripPaymentResult {
  tripId: string;
  isSuccess: boolean;
  message: string | null;
}

export const putTripPayment = async (tripPayment: TripPayment) => {
  const route = "payments/trip";
  const paymentResult = await ApiRequest.put<TripPaymentResult>(route, tripPayment)
    .catch((error: AxiosError) => {
      let errorMessage = "";
      if (error.response?.status === 500) errorMessage = "Houve um erro no seu pagamento.";
      else errorMessage = error.message;
      return { tripId: tripPayment.tripId, isSuccess: false, message: errorMessage };
    });
  return paymentResult;
};
