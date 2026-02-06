import { createPaymentIntent } from "./payments";
import { postIntentCard, postIntentFinish } from "./creditcard";
import { getPayerById, createPayer } from "./payer";

export { getPayerById };
export const PaymentsApiService = {
  createPaymentIntent,
  postIntentCard,
  postIntentFinish,
  getPayerById,
  createPayer,
};

export type { CheckoutPayerData, CheckoutPaymentMethod, CheckoutSessionPayload } from "@/core/types/payments";
