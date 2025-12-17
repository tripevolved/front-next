import { ApiRequest } from "@/services/api/request";

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

export interface PaymentItemRequest {
  amount: number;
  type: "CONSULTANCY" | "PLANNING" | "SCRIPT";
}

export interface CreatePaymentRequest {
  travelerId: string;
  tripId: string;
  items: PaymentItemRequest[];
}

export interface CreatePaymentResponse {
  paymentId: string;
}

export const getPaymentById = async (paymentId: string) => {
  const route = `payments/${paymentId}`;
  return ApiRequest.get<PaymentResponse>(route);
};

export const createPayment = async (paymentData: CreatePaymentRequest) => {
  const route = "payments";
  return ApiRequest.post<CreatePaymentResponse>(route, paymentData);
}; 