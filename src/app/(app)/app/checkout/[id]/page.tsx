"use client";

import { useEffect, useState } from "react";
import { PaymentsApiService } from "@/clients/payments";
import type { Payment, PaymentItem } from "@/clients/payments/payments";

const formatCurrency = (amount: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

interface CheckoutPageProps {
  params: {
    id: string;
  };
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const response = await PaymentsApiService.getPaymentById(params.id);
        setPayment(response.payment);
      } catch (err) {
        setError("Erro ao carregar informações do pagamento");
        console.error("Error fetching payment:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPayment();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando informações do pagamento...</p>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro</h1>
          <p className="text-gray-600">{error || "Pagamento não encontrado"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">ID do Pagamento: {payment.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Itens do Pedido</h2>
              
              <div className="space-y-4">
                {payment.items.map((item: PaymentItem) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity, payment.currency)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(item.price, payment.currency)} cada
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    payment.status === 'completed' ? 'text-green-600' :
                    payment.status === 'pending' ? 'text-yellow-600' :
                    payment.status === 'failed' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {payment.status === 'completed' ? 'Concluído' :
                     payment.status === 'pending' ? 'Pendente' :
                     payment.status === 'failed' ? 'Falhou' :
                     'Cancelado'}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Itens:</span>
                  <span className="font-medium">{payment.items.length}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>{formatCurrency(payment.totalAmount, payment.currency)}</span>
                  </div>
                </div>
              </div>

              {payment.status === 'pending' && (
                <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Finalizar Pagamento
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Customer Information */}
        {payment.customerInfo && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações do Cliente</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <p className="mt-1 text-gray-900">{payment.customerInfo.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{payment.customerInfo.email}</p>
                </div>
                {payment.customerInfo.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <p className="mt-1 text-gray-900">{payment.customerInfo.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 