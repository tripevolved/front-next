"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CreatePayerResponse } from "@/clients/payments/payer";
import { PaymentsApiService } from "@/clients/payments";
import type {
  CheckoutPayerData,
  PaymentIntentResponse,
} from "@/core/types/payments";
import type { CheckoutPaymentMethod, CheckoutSessionPayload } from "@/core/types/payments";
import { DEFAULT_CHECKOUT_PAYLOAD, STEP_NAMES } from "@/core/types/payments";
import type { TripPayer, TripPaymentMethod } from "@/core/types/payments";
import { useAppStore } from "@/core/store";

const TOTAL_STEPS = STEP_NAMES.length;

function formatIsoToBrDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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

function mapCreatePayerResponseToCheckoutPayer(
  data: CreatePayerResponse
): CheckoutPayerData {
  const phoneDigits = (data.phone ?? "").replace(/\D/g, "");
  const phoneCountryCode = "+55";
  const phone = phoneDigits.startsWith("+55") && phoneDigits.length > 10 ? phoneDigits.slice(3) : phoneDigits;
  return {
    name: data.name ?? "",
    lastName: data.lastName ?? "",
    email: data.email,
    phoneCountryCode,
    phone,
    cpf: (data.cpf ?? "").replace(/\D/g, ""),
    document: data.document ?? "",
    motherName: data.motherName ?? "",
    gender: data.gender ?? "",
    birthDate: data.birthDate ? formatIsoToBrDate(data.birthDate) : "",
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
  const phoneDigits = (data.phone ?? "").replace(/\D/g, "");
  const phoneCountryCode = "+55";
  const phone = phoneDigits.startsWith("55") && phoneDigits.length > 10 ? phoneDigits.slice(2) : phoneDigits;
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

export function usePagamentoSteps() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session") ?? null;
  const travelerId = useAppStore((state) => state.travelerState?.id ?? "");
  const travelerEmail = useAppStore((state) => state.travelerState?.email ?? "");

  const [stepIndex, setStepIndex] = useState(0);
  const [payload, setPayload] = useState<CheckoutSessionPayload>(DEFAULT_CHECKOUT_PAYLOAD);
  const [paymentIntentResponse, setPaymentIntentResponse] = useState<PaymentIntentResponse | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isLoadingPayer, setIsLoadingPayer] = useState(true);
  const payerLoadedRef = useRef(false);
  const emailPrefilledRef = useRef(false);

  useEffect(() => {
    if (!travelerEmail || emailPrefilledRef.current) return;
    emailPrefilledRef.current = true;
    setPayload((prev) => ({
      ...prev,
      payer: { ...prev.payer, email: travelerEmail },
    }));
  }, [travelerEmail]);

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
        setPayload((prev) => ({
          ...prev,
          payer: mapPayerResponseToCheckoutPayer(data),
        }));
      })
      .finally(() => {
        if (!cancelled) setIsLoadingPayer(false);
      });
    return () => {
      cancelled = true;
    };
  }, [travelerId]);

  const setPayloadPartial = useCallback((update: Partial<CheckoutSessionPayload>) => {
    setPayload((prev) => ({ ...prev, ...update }));
  }, []);

  const savePayerAndNext = useCallback(async () => {
    setSaveError(null);
    setIsSaving(true);
    try {
      const birthDateIso = parseBrDateToIso(payload.payer.birthDate);
      const countryCodeDigits = (payload.payer.phoneCountryCode ?? "+55").replace(/\D/g, "");
      const fullPhone = `+${countryCodeDigits}${payload.payer.phone}`;
      const created = await PaymentsApiService.createPayer(travelerId, {
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
      const updatedPayer = mapCreatePayerResponseToCheckoutPayer(created);
      setPayload((prev) => ({
        ...prev,
        payer: updatedPayer,
      }));
      setStepIndex((i) => Math.min(i + 1, TOTAL_STEPS - 1));
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Erro ao salvar dados do pagador.");
    } finally {
      setIsSaving(false);
    }
  }, [travelerId, payload.payer]);

  const checkoutPayerToTripPayer = useCallback((p: CheckoutPayerData): TripPayer => {
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
  }, []);

  const savePaymentMethodAndNext = useCallback(
    async (
      method: CheckoutPaymentMethod,
      totalAmount: number,
      reference?: string,
      type?: string
    ) => {
      setSaveError(null);
      setIsSaving(true);
      try {
        setPayload((prev) => ({ ...prev, paymentMethod: method }));
        const tripMethod: TripPaymentMethod = method === "credit_card" ? "CREDIT_CARD" : "PIX";
        const metadata: Record<string, string> = {};
        if (reference != null && reference !== "") metadata.reference = reference;
        if (type != null && type !== "") metadata.type = type;
        const paymentIntent = {
          payer: checkoutPayerToTripPayer(payload.payer),
          amount: totalAmount,
          installments: Math.min(12, Math.max(1, payload.installments ?? 1)),
          method: tripMethod,
          metadata,
        };
        const response = await PaymentsApiService.createPaymentIntent(paymentIntent);
        if (!response.isSuccess) {
          setSaveError(response.message ?? "Erro ao criar intenção de pagamento.");
          return;
        }
        setPaymentIntentResponse(response);
        setStepIndex((i) => Math.min(i + 1, TOTAL_STEPS - 1));
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : "Erro ao criar intenção de pagamento.");
      } finally {
        setIsSaving(false);
      }
    },
    [payload.payer, payload.installments, checkoutPayerToTripPayer]
  );

  // TODO: Finish payment — will use other endpoints (e.g. confirm payment, redirect to gateway, etc.)
  const finishAndNext = useCallback(async () => {
    setSaveError(null);
    setIsSaving(true);
    try {
      setStepIndex((i) => Math.min(i + 1, TOTAL_STEPS - 1));
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Erro ao finalizar.");
    } finally {
      setIsSaving(false);
    }
  }, []);

  const onBack = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const stepNames = useMemo(() => STEP_NAMES, []);
  const currentStep = stepIndex + 1;
  const progress = (currentStep / TOTAL_STEPS) * 100;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === TOTAL_STEPS - 1;

  return {
    stepIndex,
    currentStep,
    totalSteps: TOTAL_STEPS,
    stepNames,
    progress,
    payload,
    setPayload: setPayloadPartial,
    onBack,
    savePayerAndNext,
    savePaymentMethodAndNext,
    finishAndNext,
    isSaving,
    saveError,
    isFirstStep,
    isLastStep,
    sessionId,
    isLoadingPayer,
    travelerId: travelerId || null,
    travelerEmail: travelerEmail || undefined,
    paymentIntentResponse,
  };
}
