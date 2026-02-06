"use client";

import type { CheckoutPaymentMethod } from "@/core/types/payments";
import type { PagamentoStepProps } from "@/core/types/payments";

export function StepPaymentSelection({
  payload,
  setPayload,
  onNext,
  onBack,
  isSaving,
}: PagamentoStepProps) {
  const selected = payload.paymentMethod;

  const handleSelect = (method: CheckoutPaymentMethod) => {
    setPayload({ paymentMethod: method });
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
          <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-secondary-50 transition-colors has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50/50">
            <input
              type="radio"
              name="method"
              value="credit_card"
              checked={selected === "credit_card"}
              onChange={() => handleSelect("credit_card")}
              className="w-4 h-4 text-accent-500 border-secondary-300 focus:ring-accent-500"
            />
            <span className="font-comfortaa font-medium text-secondary-900">Cartão de crédito</span>
          </label>
          <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-secondary-50 transition-colors has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50/50">
            <input
              type="radio"
              name="method"
              value="pix"
              checked={selected === "pix"}
              onChange={() => handleSelect("pix")}
              className="w-4 h-4 text-accent-500 border-secondary-300 focus:ring-accent-500"
            />
            <span className="font-comfortaa font-medium text-secondary-900">PIX</span>
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
