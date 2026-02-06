import {
  getPaymentById,
  createPayment,
  saveCheckoutPayer,
  saveCheckoutPaymentMethod,
  finishCheckout,
} from "./payments";
import { getPayerById, createPayer } from "./payer";

export { getPayerById };
export const PaymentsApiService = {
  getPaymentById,
  createPayment,
  getPayerById,
  createPayer,
  saveCheckoutPayer,
  saveCheckoutPaymentMethod,
  finishCheckout,
};

export type { CheckoutPayerData, CheckoutPaymentMethod, CheckoutSessionPayload } from "@/core/types/payments"; 