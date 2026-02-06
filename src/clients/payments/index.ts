import { createPaymentIntent } from "./payments";
import { getPayerById, createPayer } from "./payer";

export { getPayerById };
export const PaymentsApiService = {
  createPaymentIntent,
  getPayerById,
  createPayer,
};

export type { CheckoutPayerData, CheckoutPaymentMethod, CheckoutSessionPayload } from "@/core/types/payments";
