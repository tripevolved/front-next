import { getPayerById } from "./payer";
import { putTripPayment, postTripPaymentIntent, getTripPaymentStatus } from "./payTrip";

export const PaymentsApiService = { getPayerById, putTripPayment, postTripPaymentIntent, getTripPaymentStatus };
