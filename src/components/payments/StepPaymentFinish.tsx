"use client";

import type { PagamentoStepProps } from "@/core/types/payments";

export function StepPaymentFinish({
  payload,
  setPayload,
  onNext,
  onBack,
  isSaving,
}: PagamentoStepProps) {
  const methodLabel =
    payload.paymentMethod === "credit_card"
      ? "Cartão de crédito"
      : payload.paymentMethod === "pix"
        ? "PIX"
        : "—";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
      <h2 className="font-baloo text-xl font-bold text-secondary-900 mb-6">
        Finalizar
      </h2>
      <div className="space-y-4 font-comfortaa text-secondary-700 mb-8">
        <p>
          <span className="font-semibold text-secondary-900">Pagador:</span>{" "}
          {[payload.payer.name, payload.payer.lastName].filter(Boolean).join(" ") || "—"}
        </p>
        <p>
          <span className="font-semibold text-secondary-900">E-mail:</span>{" "}
          {payload.payer.email}
        </p>
        <p>
          <span className="font-semibold text-secondary-900">Forma de pagamento:</span>{" "}
          {methodLabel}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={payload.acceptTerms ?? false}
            onChange={(e) =>
              setPayload({ acceptTerms: e.target.checked })
            }
            className="w-4 h-4 text-accent-500 border-secondary-300 rounded focus:ring-accent-500"
          />
          <span className="font-comfortaa text-sm text-secondary-700">
            Li e aceito os termos e condições do pagamento.
          </span>
        </label>
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
            disabled={isSaving}
            className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 disabled:opacity-60 transition-all"
          >
            {isSaving ? "Finalizando…" : "Confirmar e finalizar"}
          </button>
        </div>
      </form>
    </section>
  );
}
