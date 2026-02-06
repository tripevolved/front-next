"use client";

import { Suspense } from "react";
import { usePagamentoSteps } from "@/core/payments";
import {
  CheckoutStepper,
  StepPayerData,
  StepPaymentSelection,
  StepPaymentFinish,
} from "@/components/payments";

function PagamentoContent() {
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
  } = usePagamentoSteps();

  const stepProps = {
    payload,
    setPayload,
    onBack: !isFirstStep ? onBack : undefined,
    isSaving: isSaving ?? false,
    sessionId,
    isLoadingPayer,
    travelerEmail,
  };

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
                savePaymentMethodAndNext(payload.paymentMethod);
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
