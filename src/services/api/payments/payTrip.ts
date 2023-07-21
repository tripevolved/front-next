import { TripPayment } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export interface TripPaymentResult {
  tripId: string;
  isSuccess: boolean;
  message: string | null;
}

export const putTripPayment = async (tripPayment: TripPayment) => {
  const route = "payments/trip";
  const paymentResult = await ApiRequest.put<TripPaymentResult>(route, tripPayment);
  return paymentResult;
};
