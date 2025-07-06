import { ApiRequest } from "@/clients/common/request";

export interface PaymentItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Payment {
  id: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  totalAmount: number;
  currency: string;
  items: PaymentItem[];
  createdAt: string;
  updatedAt: string;
  customerInfo?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface PaymentResponse {
  payment: Payment;
}

export const getPaymentById = async (paymentId: string) => {
  const route = `payments/${paymentId}`;
  return ApiRequest.get<PaymentResponse>(route);
}; 