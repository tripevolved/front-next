"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useAppStore } from "@/core/store";
import { usePagamentoSteps } from "@/core/payments";
import {
  CheckoutStepper,
  StepPayerData,
  StepPaymentSelection,
  StepPaymentFinish,
} from "@/components/payments";

/** Círculo Evolved price in reais (e.g. 6700 = R$ 6.700,00). */
const CIRCULO_PRICE = 6700;

function PagamentoContent() {
  const travelerState = useAppStore((state) => state.travelerState);
  const subscriptionActive = travelerState?.subscription?.status === "Active";

  const {
    stepIndex,
    currentStep,
    totalSteps,
    stepNames,
    progress,
    payload,
    setPayload,
    onBack,
    savePayerAndNext,
    savePaymentMethodAndNext,
    finishAndNext,
    isSaving,
    saveError,
    isFirstStep,
    sessionId,
    isLoadingPayer = false,
    travelerEmail,
    paymentIntentResponse,
  } = usePagamentoSteps();

  const stepProps = {
    payload,
    setPayload,
    onBack: !isFirstStep ? onBack : undefined,
    isSaving: isSaving ?? false,
    sessionId,
    isLoadingPayer,
    travelerEmail,
    totalAmount: CIRCULO_PRICE,
    paymentReference: "Círculo Evolved",
    paymentType: "subscription",
    paymentIntentResponse,
  };

  if (subscriptionActive) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <header className="mb-8">
            <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">
              Círculo Evolved
            </h1>
            <p className="font-comfortaa text-secondary-600 mt-1">
              Você já possui assinatura ativa do Círculo Evolved.
            </p>
          </header>
          <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
            <p className="font-comfortaa text-secondary-700 mb-6">
              Sua assinatura do Círculo Evolved está ativa. Acesse as informações da sua assinatura abaixo.
            </p>
            <Link
              href="/app/admin/circulo-evolved"
              className="inline-block font-baloo bg-accent-500 text-secondary-900 px-6 py-3 rounded-full font-semibold hover:bg-accent-600 transition-colors text-center"
            >
              Ver informações
            </Link>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">
            Pagamento — Círculo Evolved
          </h1>
          <p className="font-comfortaa text-secondary-600 mt-1">
            Preencha os passos abaixo para concluir seu pagamento.
          </p>
        </header>

        <CheckoutStepper
          stepNames={stepNames}
          currentStep={currentStep}
          totalSteps={totalSteps}
          progress={progress}
        />

        {saveError && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800"
            role="alert"
          >
            {saveError}
          </div>
        )}

        {stepIndex === 0 && (
          <StepPayerData
            {...stepProps}
            onNext={savePayerAndNext}
          />
        )}
        {stepIndex === 1 && (
          <StepPaymentSelection
            {...stepProps}
            onNext={() => {
              if (payload.paymentMethod) {
                savePaymentMethodAndNext(
                  payload.paymentMethod,
                  stepProps.totalAmount ?? CIRCULO_PRICE,
                  stepProps.paymentReference,
                  stepProps.paymentType
                );
              }
            }}
          />
        )}
        {stepIndex === 2 && (
          <StepPaymentFinish
            {...stepProps}
            onNext={finishAndNext}
          />
        )}
      </div>
    </div>
  );
}

export default function CirculoEvolvedPagamentoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
          <p className="font-comfortaa text-secondary-600">Carregando…</p>
        </div>
      }
    >
      <PagamentoContent />
    </Suspense>
  );
}
