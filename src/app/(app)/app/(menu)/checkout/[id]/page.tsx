import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutPaymentLeftColumn } from "@/components/payments/CheckoutPaymentLeftColumn";
import { CheckoutPaymentFlow } from "@/components/payments/CheckoutPaymentFlow";
import { CheckoutConditionsProvider } from "@/components/payments/CheckoutConditionsContext";

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
          <CheckoutConditionsProvider>
            <div className="lg:sticky lg:top-8">
              <Suspense
                fallback={
                  <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
                    <div className="space-y-5 animate-pulse">
                      <div className="h-6 w-40 bg-secondary-100 rounded" />
                      <div className="space-y-3">
                        {[0, 1].map((i) => (
                          <div key={i} className="rounded-2xl border border-secondary-100 bg-secondary-50 p-4">
                            <div className="flex items-start gap-4">
                              <div className="h-16 w-16 rounded-xl bg-secondary-100" />
                              <div className="flex-1 space-y-2">
                                <div className="h-4 w-2/3 bg-secondary-100 rounded" />
                                <div className="h-3 w-5/6 bg-secondary-100 rounded" />
                                <div className="h-3 w-1/3 bg-secondary-100 rounded" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-2xl border border-secondary-100 bg-secondary-50 p-4 space-y-3">
                        <div className="h-4 w-28 bg-secondary-100 rounded" />
                        <div className="h-10 w-full bg-secondary-100 rounded-xl" />
                      </div>
                    </div>
                  </div>
                }
              >
                <CheckoutPaymentLeftColumn paymentId={id} />
              </Suspense>
            </div>

            <div className="max-w-2xl">
              <CheckoutPaymentFlow paymentId={id} />
            </div>
          </CheckoutConditionsProvider>
        </div>
      </div>
    </div>
  );
}

