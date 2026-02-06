import { getPayerById } from "@/clients/payments";
import { putTripPayment, postTripPaymentIntent, getTripPaymentStatus } from "./payTrip";

export const PaymentsApiService = {
  getPayerById,
  putTripPayment,
  postTripPaymentIntent,
  getTripPaymentStatus,
};
