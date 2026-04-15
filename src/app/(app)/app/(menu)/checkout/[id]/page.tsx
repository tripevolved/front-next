import type { Metadata } from "next";
import { Suspense } from "react";
import { CircleLoader } from "@/components/common/CircleLoader";
import { CheckoutPaymentLeftColumn } from "@/components/payments/CheckoutPaymentLeftColumn";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function PaymentCheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">Checkout</h1>
          <p className="font-comfortaa text-secondary-600 mt-1">Revise os itens e conclua seu pagamento.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky lg:top-8">
            <Suspense
              fallback={
                <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col items-center justify-center gap-5 py-6">
                    <CircleLoader className="h-20 w-20" />
                    <div className="text-center space-y-1">
                      <p className="text-sm font-semibold text-secondary-900">Carregando checkout</p>
                      <p className="font-comfortaa text-xs text-secondary-600">
                        Buscando os itens e detalhes da sua viagem.
                      </p>
                    </div>
                  </div>
                </div>
              }
            >
              <CheckoutPaymentLeftColumn paymentId={id} />
            </Suspense>
          </div>

          <div className="max-w-2xl">
            <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
              <h2 className="font-baloo text-xl font-bold text-secondary-900">Pagamento</h2>
              <p className="font-comfortaa text-secondary-600 mt-2">
                Vamos implementar o fluxo de pagamento nesta página na próxima etapa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

