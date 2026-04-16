"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAppStore } from "@/core/store";
import { PaymentsApiService } from "@/clients/payments";
import { setTripTravelers, type TripTravelerInput } from "@/clients/travelers/travelers";
import { TripsApiService } from "@/clients/trips";
import type { PaymentStatusResponse } from "@/clients/payments/payments";
import type { TripDetails } from "@/core/types";
import type {
  CheckoutPayerData,
  CheckoutSessionPayload,
  PaymentIntentItem,
  PaymentIntentResponse,
  TripPaymentMethod,
} from "@/core/types/payments";
import { DEFAULT_CHECKOUT_PAYLOAD } from "@/core/types/payments";
import {
  CheckoutStepper,
  StepPayerData,
  StepPaymentSelection,
  StepPaymentFinish,
} from "@/components/payments";
import { StepTripTravelers } from "@/components/payments/StepTripTravelers";

function formatIsoToBrDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return "";
  }
}

function parseBrDateToIso(br: string): string {
  const match = br.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return "";
  const [, day, month, year] = match;
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function parsePhoneFromE164(phone: string): { phoneCountryCode: string; phone: string } {
  const digits = (phone ?? "").replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length > 10) return { phoneCountryCode: "+55", phone: digits.slice(2) };
  if (digits.startsWith("1") && digits.length >= 10) return { phoneCountryCode: "+1", phone: digits.slice(1) };
  if (digits.startsWith("351") && digits.length > 9) return { phoneCountryCode: "+351", phone: digits.slice(3) };
  return { phoneCountryCode: "+55", phone: digits };
}

function mapPayerResponseToCheckoutPayer(data: {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
  document: string;
  motherName?: string | null;
  gender?: string;
  birthDate: string;
  address: CheckoutPayerData["address"];
}): CheckoutPayerData {
  const { phoneCountryCode, phone } = parsePhoneFromE164(data.phone ?? "");
  return {
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    phoneCountryCode,
    phone,
    cpf: (data.cpf ?? "").replace(/\D/g, ""),
    document: data.document,
    motherName: data.motherName ?? "",
    gender: data.gender ?? "",
    birthDate: formatIsoToBrDate(data.birthDate),
    address: data.address ?? {
      postalCode: "",
      address: "",
      complement: null,
      number: "",
      neighborhood: "",
      city: "",
      stateProvince: "",
      country: "Brasil",
    },
  };
}

function checkoutPayerToTripPayer(p: CheckoutPayerData) {
  const countryCodeDigits = (p.phoneCountryCode ?? "+55").replace(/\D/g, "");
  const phone = `+${countryCodeDigits}${p.phone}`;
  const birthDateIso = parseBrDateToIso(p.birthDate);
  return {
    name: p.name,
    lastName: p.lastName,
    email: p.email,
    phone,
    cpf: p.cpf,
    document: p.document || null,
    motherName: p.motherName || null,
    gender: p.gender,
    birthDate: birthDateIso ? new Date(birthDateIso) : null,
    address: p.address,
  };
}

export function CheckoutPaymentFlow({ paymentId }: { paymentId: string }) {
  const travelerId = useAppStore((s) => s.travelerState?.id ?? "");
  const travelerEmail = useAppStore((s) => s.travelerState?.email ?? "");

  const [payment, setPayment] = useState<PaymentStatusResponse | null>(null);
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [payload, setPayload] = useState<CheckoutSessionPayload>(DEFAULT_CHECKOUT_PAYLOAD);
  const [paymentIntentResponse, setPaymentIntentResponse] = useState<PaymentIntentResponse | null>(null);

  const [isLoadingPayer, setIsLoadingPayer] = useState(true);
  const payerLoadedRef = useRef(false);
  const emailPrefilledRef = useRef(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [travelers, setTravelersState] = useState<TripTravelerInput[]>([]);
  const [savingTravelers, setSavingTravelers] = useState(false);
  const [saveTravelersError, setSaveTravelersError] = useState<string | null>(null);

  const hasAccommodationItems = useMemo(
    () => (payment?.items ?? []).some((i) => i.type === "ACCOMMODATION"),
    [payment?.items]
  );
  const regularItems = useMemo(
    () => (payment?.items ?? []).filter((i) => i.paymentType === "REGULAR"),
    [payment?.items]
  );
  const onBookingItems = useMemo(
    () => (payment?.items ?? []).filter((i) => i.paymentType === "ON_BOOKING"),
    [payment?.items]
  );

  const regularTotal = useMemo(
    () => regularItems.reduce((sum, i) => sum + (typeof i.amount === "number" ? i.amount : 0), 0),
    [regularItems]
  );

  const totalSteps = useMemo(() => {
    const base = 1; // payer
    const travelersStep = hasAccommodationItems ? 1 : 0;
    const regularPaySteps = regularItems.length > 0 ? 2 : 0; // selection + finish
    const onBookingSteps = onBookingItems.length > 0 ? 3 : 0; // book + selection + finish (placeholders)
    return base + travelersStep + regularPaySteps + onBookingSteps;
  }, [hasAccommodationItems, regularItems.length, onBookingItems.length]);

  const stepNames = useMemo(() => {
    const names: string[] = ["Dados do pagador"];
    if (hasAccommodationItems) names.push("Viajantes");
    if (regularItems.length > 0) names.push("Forma de pagamento", "Finalizar");
    if (onBookingItems.length > 0) names.push("Reserva", "Pagamento da reserva", "Finalizar reserva");
    return names;
  }, [hasAccommodationItems, regularItems.length, onBookingItems.length]);

  const currentStep = stepIndex + 1;
  const progress = (currentStep / Math.max(1, totalSteps)) * 100;

  useEffect(() => {
    if (!travelerEmail || emailPrefilledRef.current) return;
    emailPrefilledRef.current = true;
    setPayload((prev) => ({ ...prev, payer: { ...prev.payer, email: travelerEmail } }));
  }, [travelerEmail]);

  useEffect(() => {
    if (!paymentId) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    setPayment(null);
    setTrip(null);

    const run = async () => {
      try {
        const p = await PaymentsApiService.getCheckoutPaymentById(paymentId);
        if (cancelled) return;
        setPayment(p);
        if (p.tripId) {
          const t = await TripsApiService.getTripDetailsById(p.tripId);
          if (cancelled) return;
          setTrip(t);
        }
        setLoading(false);
      } catch {
        if (!cancelled) {
          setLoadError("Não foi possível carregar o checkout.");
          setLoading(false);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [paymentId]);

  // Load payer from API (if we have travelerId)
  useEffect(() => {
    if (!travelerId || payerLoadedRef.current) {
      setIsLoadingPayer(false);
      return;
    }
    let cancelled = false;
    payerLoadedRef.current = true;
    setIsLoadingPayer(true);
    PaymentsApiService.getPayerById(travelerId)
      .then((data) => {
        if (cancelled || !data) return;
        setPayload((prev) => ({ ...prev, payer: mapPayerResponseToCheckoutPayer(data as any) }));
      })
      .finally(() => {
        if (!cancelled) setIsLoadingPayer(false);
      });
    return () => {
      cancelled = true;
    };
  }, [travelerId]);

  const setPayloadPartial = (update: Partial<CheckoutSessionPayload>) => {
    setPayload((prev) => ({ ...prev, ...update }));
  };

  const savePayerAndNext = async () => {
    setSaveError(null);
    setIsSaving(true);
    try {
      const birthDateIso = parseBrDateToIso(payload.payer.birthDate);
      const countryCodeDigits = (payload.payer.phoneCountryCode ?? "+55").replace(/\D/g, "");
      const fullPhone = `+${countryCodeDigits}${payload.payer.phone}`;
      await PaymentsApiService.createPayer(travelerId, {
        name: payload.payer.name,
        lastName: payload.payer.lastName,
        email: payload.payer.email,
        phone: fullPhone,
        cpf: payload.payer.cpf,
        document: payload.payer.document || null,
        motherName: payload.payer.motherName || null,
        gender: payload.payer.gender || "",
        birthDate: birthDateIso || new Date().toISOString().slice(0, 10),
        address: payload.payer.address,
      });
      setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Erro ao salvar dados do pagador.");
    } finally {
      setIsSaving(false);
    }
  };

  const travelersCount = useMemo(() => {
    const adults = trip?.configuration?.numAdults ?? 0;
    const children = trip?.configuration?.numChildren ?? 0;
    const total = Math.max(0, adults + children);
    return total || 1;
  }, [trip]);

  const saveTravelersAndNext = async () => {
    if (!payment?.tripId) {
      setSaveTravelersError("Viagem não encontrada para salvar viajantes.");
      return;
    }
    setSaveTravelersError(null);
    setSavingTravelers(true);
    try {
      const body = {
        tripId: payment.tripId,
        travelers: travelers.slice(0, travelersCount).map((t) => ({
          ...t,
          cpf: (t.cpf ?? "").replace(/\D/g, ""),
          birthDate: (t.birthDate ?? "").trim(),
        })),
      };
      await setTripTravelers(payment.tripId, body);
      setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    } catch (e) {
      setSaveTravelersError(e instanceof Error ? e.message : "Erro ao salvar viajantes.");
    } finally {
      setSavingTravelers(false);
    }
  };

  const savePaymentMethodAndNext = async () => {
    setSaveError(null);
    setIsSaving(true);
    try {
      if (!paymentId) throw new Error("Pagamento não encontrado.");
      if (!payload.paymentMethod) throw new Error("Selecione uma forma de pagamento.");

      const tripMethod: TripPaymentMethod = payload.paymentMethod === "credit_card" ? "CREDIT_CARD" : "PIX";
      const items: PaymentIntentItem[] =
        regularTotal > 0 ? [{ amount: regularTotal, type: "TRIP" as const }] : [];
      const response = await PaymentsApiService.createPaymentIntent({
        paymentId,
        payer: checkoutPayerToTripPayer(payload.payer),
        amount: regularTotal,
        installments: Math.min(12, Math.max(1, payload.installments ?? 1)),
        method: tripMethod,
        items,
        metadata: { reference: "Checkout" },
      });
      if (!response.isSuccess) {
        throw new Error(response.message ?? "Erro ao criar intenção de pagamento.");
      }
      setPaymentIntentResponse(response);
      setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Erro ao criar intenção de pagamento.");
    } finally {
      setIsSaving(false);
    }
  };

  const finishRegularAndNext = async () => {
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  };

  const onBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const stepProps = {
    payload,
    setPayload: setPayloadPartial,
    onBack: stepIndex > 0 ? onBack : undefined,
    isSaving,
    sessionId: null,
    isLoadingPayer,
    travelerEmail,
    totalAmount: regularTotal,
    paymentItems: regularTotal > 0 ? ([{ amount: regularTotal, type: "TRIP" as const }] as PaymentIntentItem[]) : [],
    paymentMetadata: { reference: "Checkout" },
    paymentIntentResponse,
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
        <p className="font-comfortaa text-secondary-600">Carregando…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="font-comfortaa text-sm text-red-800">{loadError}</p>
      </div>
    );
  }

  // Step mapping
  const payerStepIdx = 0;
  const travelersStepIdx = hasAccommodationItems ? 1 : -1;
  const regularSelectionIdx = hasAccommodationItems ? 2 : 1;
  const regularFinishIdx = hasAccommodationItems ? 3 : 2;

  return (
    <div className="space-y-6">
      <CheckoutStepper
        stepNames={stepNames as any}
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
      />

      {saveError ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800" role="alert">
          {saveError}
        </div>
      ) : null}

      {stepIndex === payerStepIdx && <StepPayerData {...stepProps} onNext={savePayerAndNext} />}

      {hasAccommodationItems && stepIndex === travelersStepIdx && (
        <>
          {saveTravelersError ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800" role="alert">
              {saveTravelersError}
            </div>
          ) : null}
          <StepTripTravelers
            count={travelersCount}
            travelers={travelers}
            setTravelers={setTravelersState}
            onBack={onBack}
            onNext={saveTravelersAndNext}
            isSaving={savingTravelers}
          />
        </>
      )}

      {regularItems.length > 0 && stepIndex === regularSelectionIdx && (
        <StepPaymentSelection
          {...stepProps}
          onNext={savePaymentMethodAndNext}
        />
      )}

      {regularItems.length > 0 && stepIndex === regularFinishIdx && (
        <StepPaymentFinish
          {...stepProps}
          onNext={finishRegularAndNext}
        />
      )}

      {/* Placeholders for ON_BOOKING flow (to be implemented) */}
      {onBookingItems.length > 0 && stepIndex > regularFinishIdx && (
        <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
          <h2 className="font-baloo text-xl font-bold text-secondary-900">Em breve</h2>
          <p className="font-comfortaa text-secondary-600 mt-2">
            Vamos implementar a etapa de reserva e o pagamento ON_BOOKING (book → selecionar pagamento → finalizar).
          </p>
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setStepIndex((i) => Math.min(i + 1, totalSteps - 1))}
              className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 transition-all"
            >
              Continuar
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

