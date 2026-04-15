"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TripsApiService } from "@/clients/trips";
import type { TripPriceResponse } from "@/clients/trips/price";
import { usePagamentoSteps } from "@/core/payments";
import { TripPaymentLeftColumn } from "@/components/trips/TripPaymentLeftColumn";
import { CircleLoader } from "@/components/common/CircleLoader";
import {
  CheckoutStepper,
  StepPayerData,
  StepPaymentSelection,
  StepPaymentFinish,
} from "@/components/payments";

function PagamentoContent() {
  const params = useParams<{ id?: string }>();
  const tripId = typeof params?.id === "string" ? params.id : "";

  const [priceData, setPriceData] = useState<TripPriceResponse | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [priceError, setPriceError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) {
      setPriceLoading(false);
      setPriceError("ID da viagem inválido.");
      return;
    }
    let cancelled = false;
    setPriceLoading(true);
    setPriceError(null);
    TripsApiService.postTripPrice(tripId)
      .then((data) => {
        if (cancelled) return;
        setPriceData(data);
        setPriceError(data.hasError ? data.errorMessage ?? "Não foi possível obter o valor." : null);
      })
      .catch(() => {
        if (!cancelled) setPriceError("Não foi possível obter o valor. Tente novamente.");
      })
      .finally(() => {
        if (!cancelled) setPriceLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tripId]);

  const tripTotal = useMemo(() => {
    const value = priceData?.price;
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  }, [priceData]);

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
    totalAmount: tripTotal ?? 0,
    paymentItems: tripTotal != null ? [{ amount: tripTotal, type: "TRIP" as const }] : [],
    paymentMetadata: tripId ? { reference: `Trip ${tripId}` } : undefined,
    paymentIntentResponse,
  };

  if (priceLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-10">
        <CircleLoader />
        <div className="max-w-md text-center space-y-2">
          <h2 className="text-lg font-semibold text-secondary-900">Carregando pagamento</h2>
          <p className="font-comfortaa text-sm text-secondary-600 leading-relaxed">
            Estamos buscando o valor da sua viagem para iniciar o pagamento.
          </p>
        </div>
      </div>
    );
  }

  if (priceError || tripTotal == null) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <header className="mb-8">
            <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">
              Pagamento — Viagem
            </h1>
          </header>
          <div
            className="p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800"
            role="alert"
          >
            {priceError ?? "Não foi possível carregar as informações para o pagamento."}
          </div>
          <Link
            href={tripId ? `/app/viagens/${encodeURIComponent(tripId)}/checkout` : "/app/viagens/nova"}
            className="inline-block mt-6 font-baloo bg-accent-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-600 transition-colors"
          >
            Voltar ao checkout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">Pagamento — Viagem</h1>
          <p className="font-comfortaa text-secondary-600 mt-1">Revise os detalhes e conclua seu pagamento.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky lg:top-8">
            <TripPaymentLeftColumn tripId={tripId} />
          </div>

          <div className="max-w-2xl">
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

            {stepIndex === 0 && <StepPayerData {...stepProps} onNext={savePayerAndNext} />}
            {stepIndex === 1 && (
              <StepPaymentSelection
                {...stepProps}
                onNext={() => {
                  if (payload.paymentMethod) {
                    savePaymentMethodAndNext(
                      payload.paymentMethod,
                      stepProps.totalAmount,
                      stepProps.paymentItems,
                      stepProps.paymentMetadata
                    );
                  }
                }}
              />
            )}
            {stepIndex === 2 && <StepPaymentFinish {...stepProps} onNext={finishAndNext} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TripPagamentoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-10">
          <CircleLoader />
          <div className="max-w-md text-center space-y-2">
            <h2 className="text-lg font-semibold text-secondary-900">Carregando pagamento</h2>
            <p className="font-comfortaa text-sm text-secondary-600 leading-relaxed">
              Preparando o ambiente para concluir sua reserva.
            </p>
          </div>
        </div>
      }
    >
      <PagamentoContent />
    </Suspense>
  );
}

