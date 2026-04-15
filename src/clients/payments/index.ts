import { createPaymentIntent, getPaymentByTransactionId, getCheckoutPaymentById } from "./payments";
import { postIntentCard, postIntentFinish } from "./creditcard";
import { getPayerById, createPayer } from "./payer";
import { createCheckoutPayment } from "./checkout";

export { getPayerById };
export const PaymentsApiService = {
  createCheckoutPayment,
  createPaymentIntent,
  getPaymentByTransactionId,
  getCheckoutPaymentById,
  postIntentCard,
  postIntentFinish,
  getPayerById,
  createPayer,
};

export type {
  CheckoutPayerData,
  CheckoutPaymentMethod,
  CheckoutSessionPayload,
  CreateCheckoutPaymentRequest,
  CreateCheckoutPaymentResponse,
  CheckoutPaymentItem,
  PaymentIntentItem,
  PaymentIntentItemType,
} from "@/core/types/payments";
