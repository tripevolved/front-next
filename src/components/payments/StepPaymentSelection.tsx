"use client";

import type { CheckoutPaymentMethod } from "@/core/types/payments";
import type { PagamentoStepProps } from "@/core/types/payments";

const MAX_INSTALLMENTS = 12;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function StepPaymentSelection({
  payload,
  setPayload,
  onNext,
  onBack,
  isSaving,
  totalAmount = 0,
  paymentItems = [],
  checkoutItems = [],
}: PagamentoStepProps) {
  const selected = payload.paymentMethod;
  const installments = Math.min(MAX_INSTALLMENTS, Math.max(1, payload.installments ?? 1));

  const oneTimeTotal = totalAmount;
  const installmentsTotal =
    Array.isArray(checkoutItems) && checkoutItems.length > 0
      ? checkoutItems.reduce((sum, it) => {
          const amt =
            typeof it?.amountInInstallments === "number" && it.amountInInstallments > 0
              ? Number(it.amountInInstallments)
              : Number(it?.amount ?? 0);
          return sum + (Number.isFinite(amt) ? amt : 0);
        }, 0)
      : Array.isArray(paymentItems) && paymentItems.length > 0
        ? paymentItems.reduce((sum, it) => sum + (Number.isFinite((it as any)?.amount) ? Number((it as any).amount) : 0), 0)
        : totalAmount;

  const pixPercentOff =
    installmentsTotal > 0 && oneTimeTotal > 0 && installmentsTotal > oneTimeTotal
      ? Math.round(((installmentsTotal - oneTimeTotal) / installmentsTotal) * 100)
      : 0;

  const cardPerMonth12 = installmentsTotal > 0 ? installmentsTotal / 12 : 0;

  const totalForSelectedInstallments = installments <= 1 ? oneTimeTotal : installmentsTotal;

  const handleSelect = (method: CheckoutPaymentMethod) => {
    setPayload({
      paymentMethod: method,
      ...(method === "credit_card"
        ? { installments: (payload.installments ?? 1) > 1 ? payload.installments : 12 }
        : {}),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) onNext();
  };

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
      <h2 className="font-baloo text-xl font-bold text-secondary-900 mb-6">
        Forma de pagamento
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-secondary-50 transition-colors has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50/50">
            <input
              type="radio"
              name="method"
              value="credit_card"
              checked={selected === "credit_card"}
              onChange={() => handleSelect("credit_card")}
              className="w-4 h-4 text-accent-500 border-secondary-300 focus:ring-accent-500 mt-1"
            />
            <span className="min-w-0">
              <span className="block font-comfortaa font-medium text-secondary-900">Cartão de crédito</span>
              {installmentsTotal > 0 ? (
                <span className="block font-comfortaa text-xs text-secondary-600 mt-1">
                  Em até 12x sem juros de{" "}
                  <span className="font-semibold text-secondary-900 tabular-nums">{formatCurrency(cardPerMonth12)}</span>
                </span>
              ) : null}
            </span>
          </label>
          {selected === "credit_card" && (
            <div className="ml-7 pl-4 border-l-2 border-secondary-100 space-y-2">
              <label htmlFor="installments" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-2">
                Número de parcelas
              </label>
              <select
                id="installments"
                value={installments}
                onChange={(e) => setPayload({ installments: Number(e.target.value) })}
                className="w-full max-w-xs px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white"
              >
                {Array.from({ length: MAX_INSTALLMENTS }, (_, i) => {
                  const n = i + 1;
                  const total = n === 1 ? oneTimeTotal : installmentsTotal;
                  const value = total > 0 ? total / n : 0;
                  return (
                    <option key={n} value={n}>
                      {n}x {total > 0 ? formatCurrency(value) : "—"}
                    </option>
                  );
                })}
              </select>
              {totalForSelectedInstallments > 0 && (
                <p className="font-comfortaa text-xs text-secondary-500 mt-1">
                  Total: {formatCurrency(totalForSelectedInstallments)}.
                </p>
              )}
            </div>
          )}
          <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-secondary-50 transition-colors has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50/50">
            <input
              type="radio"
              name="method"
              value="pix"
              checked={selected === "pix"}
              onChange={() => handleSelect("pix")}
              className="w-4 h-4 text-accent-500 border-secondary-300 focus:ring-accent-500 mt-1"
            />
            <span className="min-w-0">
              <span className="block font-comfortaa font-medium text-secondary-900">PIX</span>
              {oneTimeTotal > 0 ? (
                <span className="mt-1 inline-flex items-center gap-2 font-comfortaa text-xs text-secondary-600">
                  <span className="tabular-nums font-semibold text-secondary-900">{formatCurrency(oneTimeTotal)}</span>
                  {pixPercentOff > 0 ? (
                    <span className="inline-flex items-center rounded-full bg-accent-500 text-white px-2.5 py-1 text-[10px] font-baloo font-bold">
                      {pixPercentOff}% OFF
                    </span>
                  ) : null}
                </span>
              ) : null}
            </span>
          </label>
        </div>
        <div className="flex gap-3 pt-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              Voltar
            </button>
          )}
          <button
            type="submit"
            disabled={!selected || isSaving}
            className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 disabled:opacity-60 transition-all"
          >
            {isSaving ? "Salvando…" : "Continuar"}
          </button>
        </div>
      </form>
    </section>
  );
}
