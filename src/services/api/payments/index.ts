import { getPayerById } from "./payer";
import { putTripPayment, postTripPaymentIntent } from "./payTrip";

export const PaymentsApiService = { getPayerById, putTripPayment, postTripPaymentIntent };
