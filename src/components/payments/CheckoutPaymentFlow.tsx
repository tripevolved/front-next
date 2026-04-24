"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/core/store";
import { PaymentsApiService } from "@/clients/payments";
import { TripsApiService } from "@/clients/trips";
import type { CheckoutPaymentItemResponse, PaymentStatusResponse } from "@/clients/payments/payments";
import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import type { TripDetails } from "@/core/types";
import type { TripConfigurationRoom } from "@/core/types/trip";
import type {
  CheckoutPayerData,
  CheckoutSessionPayload,
  PaymentCondition,
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
import { StepOnBookingPreReservation } from "@/components/payments/StepOnBookingPreReservation";
import type { TripTravelerInput } from "@/clients/trips/travelers";
import { useCheckoutConditions } from "@/components/payments/CheckoutConditionsContext";

function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatIsoToBrDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return "";
  }
}

function regularItemTitle(item: CheckoutPaymentItemResponse, accommodationsById: Record<string, TripAccommodationItem>) {
  if (item.type === "ACCOMMODATION") {
    const acc = accommodationsById[item.domainId];
    return acc?.name?.trim() ? acc.name : `Hospedagem (${item.domainId})`;
  }
  if (item.type === "SUBSCRIPTION_TOTAL") return "Círculo Evolved — Total";
  if (item.type === "SUBSCRIPTION_ESSENTIAL") return "Círculo Evolved — Essencial";
  return "Item";
}

function regularItemsToPaymentIntentItems(items: CheckoutPaymentItemResponse[]): PaymentIntentItem[] {
  return items.map((it) => {
    if (it.type === "ACCOMMODATION") {
      return { id: it.id, amount: it.amount, type: "TRIP" as const };
    }
    if (it.type === "SUBSCRIPTION_TOTAL") {
      return { id: it.id, amount: it.amount, type: "SUBSCRIPTION_TOTAL" as const };
    }
    return { id: it.id, amount: it.amount, type: "SUBSCRIPTION_ESSENTIAL" as const };
  });
}

function priceBadgeFromInstallments(totalInstallments?: number, oneTime?: number) {
  if (typeof totalInstallments !== "number" || typeof oneTime !== "number") return null;
  if (totalInstallments <= 0 || oneTime <= 0) return null;
  const perMonth = totalInstallments / 12;
  const savings = totalInstallments - oneTime;
  const percentOff = savings > 0 ? Math.round((savings / totalInstallments) * 100) : 0;
  return { perMonth, savings, percentOff };
}

function buildCheckoutIntentReferenceMetadata(
  paymentId: string,
  items: CheckoutPaymentItemResponse[],
  accommodationsById: Record<string, TripAccommodationItem>
): Record<string, string> {
  const titles = items.map((it) => regularItemTitle(it, accommodationsById));
  const maxLen = 450;
  let body = titles.join(" | ");
  if (body.length > maxLen) body = `${body.slice(0, maxLen - 1)}…`;
  return { reference: `Checkout (${paymentId}): ${body}` };
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
  const { statusByTripAccommodationId } = useCheckoutConditions();

  const [payment, setPayment] = useState<PaymentStatusResponse | null>(null);
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [accommodationsById, setAccommodationsById] = useState<Record<string, TripAccommodationItem>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [payload, setPayload] = useState<CheckoutSessionPayload>(DEFAULT_CHECKOUT_PAYLOAD);
  const [paymentIntentResponse, setPaymentIntentResponse] = useState<PaymentIntentResponse | null>(null);

  const [isLoadingPayer, setIsLoadingPayer] = useState(true);
  const payerLoadedTravelerIdRef = useRef<string | null>(null);
  const payerLoadSeqRef = useRef(0);
  const emailPrefilledRef = useRef(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [travelers, setTravelersState] = useState<TripTravelerInput[]>([]);
  const [savingTravelers, setSavingTravelers] = useState(false);
  const [saveTravelersError, setSaveTravelersError] = useState<string | null>(null);
  const travelersLoadedTripIdRef = useRef<string | null>(null);

  /** When ON_BOOKING follows REGULAR, payment method + PIX/card share one step (“Forma de pagamento”). */
  const [regularCheckoutPhase, setRegularCheckoutPhase] = useState<"method" | "pay">("method");

  const [onBookingConditions, setOnBookingConditions] = useState<PaymentCondition[] | null>(null);
  const [onBookingConditionsLoading, setOnBookingConditionsLoading] = useState(false);
  const [onBookingConditionsError, setOnBookingConditionsError] = useState<string | null>(null);
  const onBookingConditionsSeqRef = useRef(0);
  const [onBookingPhase, setOnBookingPhase] = useState<"select" | "pay">("select");
  const [onBookingPaymentConditionId, setOnBookingPaymentConditionId] = useState<number | null>(null);
  const [onBookingPaymentMethod, setOnBookingPaymentMethod] = useState<TripPaymentMethod | null>(null);
  const [onBookingInstallments, setOnBookingInstallments] = useState(1);
  const [onBookingPaymentIntentResponse, setOnBookingPaymentIntentResponse] = useState<PaymentIntentResponse | null>(
    null
  );
  const [onBookingSaving, setOnBookingSaving] = useState(false);
  const [onBookingSaveError, setOnBookingSaveError] = useState<string | null>(null);

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
  const onBookingAccommodationIds = useMemo(
    () => onBookingItems.filter((i) => i.type === "ACCOMMODATION").map((i) => i.domainId),
    [onBookingItems]
  );

  const regularTotal = useMemo(
    () => regularItems.reduce((sum, i) => sum + (typeof i.amount === "number" ? i.amount : 0), 0),
    [regularItems]
  );

  const regularInstallmentsTotal = useMemo(
    () =>
      regularItems.reduce((sum, i) => {
        const amt =
          typeof i.amountInInstallments === "number" && i.amountInInstallments > 0 ? i.amountInInstallments : i.amount;
        return sum + (typeof amt === "number" ? amt : 0);
      }, 0),
    [regularItems]
  );

  const onBookingTotal = useMemo(
    () => onBookingItems.reduce((sum, i) => sum + (typeof i.amount === "number" ? i.amount : 0), 0),
    [onBookingItems]
  );

  const regularPaymentIntentItems = useMemo(() => regularItemsToPaymentIntentItems(regularItems), [regularItems]);
  const onBookingPaymentIntentItems = useMemo(
    () => regularItemsToPaymentIntentItems(onBookingItems),
    [onBookingItems]
  );

  const regularPaymentIntentMetadata = useMemo(
    () => buildCheckoutIntentReferenceMetadata(paymentId, regularItems, accommodationsById),
    [paymentId, regularItems, accommodationsById]
  );

  const onBookingPaymentIntentMetadata = useMemo(
    () => buildCheckoutIntentReferenceMetadata(paymentId, onBookingItems, accommodationsById),
    [paymentId, onBookingItems, accommodationsById]
  );

  const hasOnBookingAfterRegular = onBookingItems.length > 0 && regularItems.length > 0;

  const checkoutStepPlan = useMemo(() => {
    const base = 1 + (hasAccommodationItems ? 1 : 0);
    const regularPaySteps =
      regularItems.length > 0 ? (onBookingItems.length > 0 ? 1 : 2) : 0;
    const onBookingSteps = onBookingItems.length > 0 ? 3 : 0;
    const totalSteps = base + regularPaySteps + onBookingSteps;

    const afterTravelersIdx = hasAccommodationItems ? 2 : 1;
    const regularSelectionIdx = regularItems.length > 0 ? afterTravelersIdx : -1;
    const regularFinishIdx =
      regularItems.length > 0 && onBookingItems.length === 0 ? afterTravelersIdx + 1 : -1;
    const onBookingStepStartIdx = afterTravelersIdx + regularPaySteps;

    const stepNames: string[] = ["Dados do pagador"];
    if (hasAccommodationItems) stepNames.push("Viajantes");
    if (regularItems.length > 0) {
      stepNames.push("Forma de pagamento");
      if (onBookingItems.length === 0) stepNames.push("Finalizar");
    }
    if (onBookingItems.length > 0) {
      stepNames.push("Pré-reserva", "Pagamento da reserva", "Finalizar reserva");
    }

    return {
      totalSteps,
      stepNames,
      payerStepIdx: 0 as const,
      travelersStepIdx: hasAccommodationItems ? 1 : -1,
      regularSelectionIdx,
      regularFinishIdx,
      onBookingStepStartIdx,
    };
  }, [hasAccommodationItems, regularItems.length, onBookingItems.length]);

  const totalSteps = checkoutStepPlan.totalSteps;
  const stepNames = checkoutStepPlan.stepNames;
  const {
    payerStepIdx,
    travelersStepIdx,
    regularSelectionIdx,
    regularFinishIdx,
    onBookingStepStartIdx,
  } = checkoutStepPlan;

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
    setAccommodationsById({});

    const run = async () => {
      try {
        const p = await PaymentsApiService.getCheckoutPaymentById(paymentId);
        if (cancelled) return;
        setPayment(p);
        if (p.tripId) {
          const t = await TripsApiService.getTripDetailsById(p.tripId);
          if (cancelled) return;
          setTrip(t);
          try {
            const accs = await TripsApiService.getTripAccommodations(p.tripId);
            if (cancelled) return;
            const map: Record<string, TripAccommodationItem> = {};
            for (const a of accs) {
              if (a?.id) map[a.id] = a;
            }
            setAccommodationsById(map);
          } catch {
            if (!cancelled) setAccommodationsById({});
          }
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

  useEffect(() => {
    setRegularCheckoutPhase("method");
    setOnBookingConditions(null);
    setOnBookingConditionsLoading(false);
    setOnBookingConditionsError(null);
    setOnBookingPhase("select");
    setOnBookingPaymentConditionId(null);
    setOnBookingPaymentMethod(null);
    setOnBookingInstallments(1);
    setOnBookingPaymentIntentResponse(null);
    setOnBookingSaving(false);
    setOnBookingSaveError(null);
  }, [paymentId]);

  const onBookingPrimaryAccommodationId = useMemo(() => {
    const firstAcc = onBookingItems.find((i) => i.type === "ACCOMMODATION");
    return firstAcc?.domainId ?? "";
  }, [onBookingItems]);

  useEffect(() => {
    const tripId = payment?.tripId ?? "";
    const tripAccommodationId = onBookingPrimaryAccommodationId;
    if (!tripId || !tripAccommodationId) return;
    // Fetch ON_BOOKING payment conditions only when the user reaches the
    // ON_BOOKING conditions step (right after pré-reserva). This is step 4
    // in the UI for on-booking flows.
    if (stepIndex !== onBookingStepStartIdx + 1) return;
    if (onBookingPhase !== "select") return;

    onBookingConditionsSeqRef.current += 1;
    const seq = onBookingConditionsSeqRef.current;
    setOnBookingConditionsLoading(true);
    setOnBookingConditionsError(null);

    const fetchOnce = async () => {
      return PaymentsApiService.getAccommodationPaymentConditions(tripId, tripAccommodationId);
    };

    const run = async () => {
      try {
        const conds = await fetchOnce();
        if (seq !== onBookingConditionsSeqRef.current) return;
        setOnBookingConditions(Array.isArray(conds) ? conds : []);
      } catch (e1) {
        if (seq !== onBookingConditionsSeqRef.current) return;
        // Backend can take a moment to materialize conditions right after pré-reserva.
        await new Promise((r) => setTimeout(r, 1000));
        if (seq !== onBookingConditionsSeqRef.current) return;
        try {
          const conds2 = await fetchOnce();
          if (seq !== onBookingConditionsSeqRef.current) return;
          setOnBookingConditions(Array.isArray(conds2) ? conds2 : []);
        } catch (e2) {
          if (seq !== onBookingConditionsSeqRef.current) return;
          const msg = e2 instanceof Error ? e2.message : "";
          setOnBookingConditionsError(msg?.trim() || "Não foi possível carregar as condições de pagamento.");
        }
      } finally {
        if (seq === onBookingConditionsSeqRef.current) setOnBookingConditionsLoading(false);
      }
    };

    void run();
  }, [payment?.tripId, onBookingPrimaryAccommodationId, stepIndex, onBookingStepStartIdx, onBookingPhase]);

  const selectedOnBookingCondition = useMemo(() => {
    if (!onBookingConditions || onBookingPaymentConditionId == null) return null;
    return onBookingConditions.find((c) => c.id === onBookingPaymentConditionId) ?? null;
  }, [onBookingConditions, onBookingPaymentConditionId]);

  const onBookingInstallmentOptions = useMemo(() => {
    const cond = selectedOnBookingCondition;
    if (!cond || cond.paymentMethod !== "CREDIT_CARD") return [];
    const max = Math.min(12, Math.max(1, cond.maxInstallments ?? 1));
    const minParcel = Math.max(0, Number(cond.minimumParcel ?? 0));
    const total = Number(onBookingTotal ?? 0);
    const options: number[] = [];
    for (let n = 1; n <= max; n++) {
      const value = total > 0 ? total / n : 0;
      if (minParcel > 0 && value < minParcel) continue;
      options.push(n);
    }
    return options.length > 0 ? options : [1];
  }, [selectedOnBookingCondition, onBookingTotal]);

  useEffect(() => {
    if (onBookingPaymentMethod !== "CREDIT_CARD") return;
    const opts = onBookingInstallmentOptions;
    if (opts.length === 0) return;
    if (!opts.includes(onBookingInstallments)) setOnBookingInstallments(opts[0]);
  }, [onBookingInstallmentOptions, onBookingInstallments, onBookingPaymentMethod]);

  // Load payer from API (if we have travelerId)
  useEffect(() => {
    if (!travelerId) {
      setIsLoadingPayer(false);
      return;
    }
    if (payerLoadedTravelerIdRef.current === travelerId) {
      setIsLoadingPayer(false);
      return;
    }

    payerLoadSeqRef.current += 1;
    const seq = payerLoadSeqRef.current;
    setIsLoadingPayer(true);
    PaymentsApiService.getPayerById(travelerId)
      .then((data) => {
        if (seq !== payerLoadSeqRef.current || !data) return;
        setPayload((prev) => ({ ...prev, payer: mapPayerResponseToCheckoutPayer(data as any) }));
        payerLoadedTravelerIdRef.current = travelerId;
      })
      .finally(() => {
        if (seq === payerLoadSeqRef.current) setIsLoadingPayer(false);
      });
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

  const rooms: TripConfigurationRoom[] = useMemo(() => {
    const r = trip?.configuration?.rooms;
    if (Array.isArray(r) && r.length > 0) return r;
    // fallback: single room with global counts
    const adults = trip?.configuration?.numAdults ?? 0;
    const children = trip?.configuration?.numChildren ?? 0;
    return [{ numAdults: adults, numChildren: children, childrenAges: [] }];
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
        travelers: travelers.map((t) => ({
          ...t,
          cpf: (t.cpf ?? "").replace(/\D/g, ""),
          birthDate: parseBrDateToIso((t.birthDate ?? "").trim()),
        })),
      };
      await TripsApiService.postTripTravelers(payment.tripId, body);
      setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    } catch (e) {
      setSaveTravelersError(e instanceof Error ? e.message : "Erro ao salvar viajantes.");
    } finally {
      setSavingTravelers(false);
    }
  };

  // Preload travelers from GET /trips/{tripId}/travelers when entering the travelers step.
  useEffect(() => {
    if (travelersStepIdx < 0) return;
    if (stepIndex !== travelersStepIdx) return;
    const tripId = payment?.tripId ?? "";
    if (!tripId) return;
    if (travelersLoadedTripIdRef.current === tripId) return;

    let cancelled = false;
    TripsApiService.getTripTravelers(tripId)
      .then((res) => {
        if (cancelled) return;
        const incoming = Array.isArray(res?.travelers) ? res.travelers : [];
        if (incoming.length > 0) {
          // API returns birthDate as ISO (YYYY-MM-DD); the form expects DD/MM/YYYY.
          setTravelersState(
            incoming.map((t) => ({
              ...t,
              birthDate: formatIsoToBrDate((t as any)?.birthDate ?? ""),
            }))
          );
          travelersLoadedTripIdRef.current = tripId;
        }
      })
      .catch(() => {
        // Silent fail: form will stay empty and user can fill manually.
      });

    return () => {
      cancelled = true;
    };
  }, [stepIndex, travelersStepIdx, payment?.tripId]);

  const savePaymentMethodAndNext = async () => {
    setSaveError(null);
    setIsSaving(true);
    try {
      if (!paymentId) throw new Error("Pagamento não encontrado.");
      if (!payload.paymentMethod) throw new Error("Selecione uma forma de pagamento.");

      const tripMethod: TripPaymentMethod = payload.paymentMethod === "credit_card" ? "CREDIT_CARD" : "PIX";
      const items: PaymentIntentItem[] = regularTotal > 0 ? regularPaymentIntentItems : [];
      const response = await PaymentsApiService.createPaymentIntent({
        paymentId,
        payer: checkoutPayerToTripPayer(payload.payer),
        amount: regularTotal,
        installments: Math.min(12, Math.max(1, payload.installments ?? 1)),
        method: tripMethod,
        items,
        metadata: regularPaymentIntentMetadata,
      });
      if (!response?.isSuccess) {
        throw new Error(response?.message ?? "Erro ao criar intenção de pagamento.");
      }
      if (!response?.transactionId?.trim()) {
        throw new Error("Erro ao criar intenção de pagamento.");
      }
      setPaymentIntentResponse(response);
      if (hasOnBookingAfterRegular) {
        setRegularCheckoutPhase("pay");
      } else {
        setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
      }
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Erro ao criar intenção de pagamento.");
    } finally {
      setIsSaving(false);
    }
  };

  const finishRegularAndNext = async () => {
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  };

  const saveOnBookingPaymentAndNext = async () => {
    setOnBookingSaveError(null);
    setOnBookingSaving(true);
    try {
      if (!paymentId) throw new Error("Pagamento não encontrado.");
      const cond = selectedOnBookingCondition;
      if (!cond) throw new Error("Selecione uma condição de pagamento.");

      const method: TripPaymentMethod = cond.paymentMethod;
      const installments = method === "CREDIT_CARD" ? onBookingInstallments : 1;

      const response = await PaymentsApiService.createPaymentIntent({
        paymentId,
        payer: checkoutPayerToTripPayer(payload.payer),
        amount: onBookingTotal,
        installments,
        method,
        paymentConditionId: cond.id,
        items: onBookingTotal > 0 ? onBookingPaymentIntentItems : [],
        metadata: onBookingPaymentIntentMetadata,
      });
      if (!response?.isSuccess) throw new Error(response?.message ?? "Erro ao criar intenção de pagamento.");
      if (!response?.transactionId?.trim()) throw new Error("Erro ao criar intenção de pagamento.");

      setPayloadPartial({
        paymentMethod: method === "CREDIT_CARD" ? "credit_card" : "pix",
        installments,
      });
      setOnBookingPaymentIntentResponse(response);
      setOnBookingPaymentMethod(method);
      setOnBookingPhase("pay");
    } catch (e) {
      setOnBookingSaveError(e instanceof Error ? e.message : "Erro ao criar intenção de pagamento.");
    } finally {
      setOnBookingSaving(false);
    }
  };

  const advanceFromPreBookStep = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }, [totalSteps]);

  const onBack = () => {
    if (hasOnBookingAfterRegular && regularCheckoutPhase === "pay" && stepIndex === regularSelectionIdx) {
      setRegularCheckoutPhase("method");
      setPaymentIntentResponse(null);
      return;
    }
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const stepProps = {
    payload,
    setPayload: setPayloadPartial,
    onBack: stepIndex > 0 ? onBack : undefined,
    isSaving,
    sessionId: null,
    isLoadingPayer,
    travelerEmail,
    totalAmount: regularTotal,
    paymentItems: regularTotal > 0 ? regularPaymentIntentItems : [],
    checkoutItems: regularItems,
    paymentMetadata: regularPaymentIntentMetadata,
    paymentIntentResponse,
    pixCheckoutPaymentId: paymentId,
  };

  const accommodationIdsInPayment = useMemo(() => {
    const items = (payment?.items ?? []).filter((i) => i.type === "ACCOMMODATION");
    return Array.from(new Set(items.map((i) => i.domainId).filter(Boolean)));
  }, [payment?.items]);

  const accommodationsGate = useMemo(() => {
    if (accommodationIdsInPayment.length === 0) return { isBlocked: false, reason: null as string | null };
    let anyLoading = false;
    let anyFail = false;
    for (const id of accommodationIdsInPayment) {
      const st = statusByTripAccommodationId[id] ?? "idle";
      if (st === "loading" || st === "idle") anyLoading = true;
      if (st === "fail") anyFail = true;
    }
    if (anyFail) return { isBlocked: true, reason: "Uma das hospedagens não está mais disponível para reserva." };
    if (anyLoading) return { isBlocked: true, reason: "Verificando disponibilidade das hospedagens…" };
    return { isBlocked: false, reason: null };
  }, [accommodationIdsInPayment, statusByTripAccommodationId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-secondary-200 bg-white p-6 shadow-sm">
        <div className="space-y-5 animate-pulse">
          <div className="h-6 w-40 bg-secondary-100 rounded" />
          <div className="space-y-3">
            <div className="h-3 w-full bg-secondary-100 rounded" />
            <div className="h-3 w-5/6 bg-secondary-100 rounded" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 rounded-xl bg-secondary-100" />
            ))}
          </div>
          <div className="h-10 w-full bg-secondary-100 rounded-xl" />
        </div>
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

  return (
    <div className="space-y-6">
      <CheckoutStepper
        stepNames={stepNames as any}
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
      />

      {accommodationsGate.isBlocked && accommodationsGate.reason && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-comfortaa text-sm text-amber-900">{accommodationsGate.reason}</p>
          {payment?.tripId ? (
            <div className="pt-3">
              <Link
                href={`/app/viagens/${encodeURIComponent(payment.tripId)}`}
                className="font-comfortaa text-sm font-semibold text-amber-900 hover:underline underline-offset-2"
              >
                Voltar para a viagem &rarr;
              </Link>
            </div>
          ) : null}
        </div>
      )}

      {saveError ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800" role="alert">
          {saveError}
        </div>
      ) : null}

      {stepIndex === payerStepIdx && (
        <StepPayerData
          {...stepProps}
          onNext={savePayerAndNext}
          nextDisabled={accommodationsGate.isBlocked}
          nextDisabledReason={accommodationsGate.reason}
        />
      )}

      {hasAccommodationItems && stepIndex === travelersStepIdx && (
        <>
          {saveTravelersError ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800" role="alert">
              {saveTravelersError}
            </div>
          ) : null}
          <StepTripTravelers
            rooms={rooms}
            travelers={travelers}
            setTravelers={setTravelersState}
            onBack={onBack}
            onNext={saveTravelersAndNext}
            isSaving={savingTravelers}
          />
        </>
      )}

      {regularItems.length > 0 && stepIndex === regularSelectionIdx && (
        <>
          {(!hasOnBookingAfterRegular || regularCheckoutPhase === "method") && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm">
                <p className="font-baloo text-lg font-bold text-secondary-900">
                  Total de{" "}
                  <span className="tabular-nums">{formatCurrencyBRL(regularTotal)}</span>
                  {" "}à vista
                </p>
                {regularInstallmentsTotal > regularTotal ? (
                  <p className="font-comfortaa text-xs text-secondary-600 mt-1">
                    ou em até 12x sem juros de{" "}
                    <span className="font-semibold tabular-nums text-secondary-900">
                      {formatCurrencyBRL(regularInstallmentsTotal / 12)}
                    </span>
                  </p>
                ) : null}
                <p className="font-comfortaa text-xs text-secondary-600 mt-2">
                  Para <span className="font-semibold">Trip Evolved Viagens LTDA</span>.
                </p>
                <div className="mt-4 border-t border-secondary-100 pt-4">
                  <ul className="space-y-2">
                    {regularItems.map((it) => (
                      <li key={it.id} className="flex items-start justify-between gap-3 font-comfortaa text-sm text-secondary-700">
                        <span className="min-w-0">{regularItemTitle(it, accommodationsById)}</span>
                        <span className="shrink-0 text-right">
                          {(() => {
                            const badge = priceBadgeFromInstallments(it.amountInInstallments, it.amount);
                            if (!badge) return null;
                            return (
                            <span className="block text-[11px] text-secondary-600">
                              Em 12x de{" "}
                              <span className="font-semibold tabular-nums text-secondary-900">
                                {formatCurrencyBRL(badge.perMonth)}
                              </span>
                              {" "}ou
                            </span>
                            );
                          })()}
                          <span className="inline-flex items-center gap-2 font-semibold tabular-nums text-secondary-900">
                            {formatCurrencyBRL(it.amount)}
                            {(() => {
                              const badge = priceBadgeFromInstallments(it.amountInInstallments, it.amount);
                              if (!badge?.percentOff) return null;
                              return (
                              <span className="inline-flex items-center rounded-full bg-accent-500 text-white px-2 py-0.5 text-[10px] font-baloo font-bold">
                                {badge.percentOff}% OFF
                              </span>
                              );
                            })()}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <StepPaymentSelection {...stepProps} onNext={savePaymentMethodAndNext} />
            </div>
          )}
          {hasOnBookingAfterRegular && regularCheckoutPhase === "pay" && (
            <StepPaymentFinish
              {...stepProps}
              onNext={finishRegularAndNext}
              paymentSuccessPrimaryAction={{
                label: "Continuar para a pré-reserva",
                onClick: () => {
                  setStepIndex(onBookingStepStartIdx);
                  setRegularCheckoutPhase("method");
                  setPaymentIntentResponse(null);
                },
              }}
            />
          )}
        </>
      )}

      {regularItems.length > 0 && regularFinishIdx >= 0 && stepIndex === regularFinishIdx && (
        <StepPaymentFinish
          {...stepProps}
          onNext={finishRegularAndNext}
        />
      )}

      {onBookingItems.length > 0 && stepIndex === onBookingStepStartIdx && (
        <>
          {payment?.tripId ? (
            <StepOnBookingPreReservation
              tripId={payment.tripId}
              accommodationIds={onBookingAccommodationIds}
              onComplete={advanceFromPreBookStep}
              onBack={stepIndex > 0 ? onBack : undefined}
            />
          ) : (
            <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
              <h2 className="font-baloo text-xl font-bold text-secondary-900">Pré-reserva</h2>
              <p className="font-comfortaa text-secondary-600 mt-2">
                Não foi possível identificar a viagem para esta pré-reserva. Volte e tente novamente ou fale com o suporte.
              </p>
              {onBack ? (
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={onBack}
                    className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors border border-secondary-200"
                  >
                    Voltar
                  </button>
                </div>
              ) : null}
            </section>
          )}
        </>
      )}

      {onBookingItems.length > 0 && stepIndex === onBookingStepStartIdx + 1 && (
        <>
          {onBookingSaveError ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800" role="alert">
              {onBookingSaveError}
            </div>
          ) : null}

          {onBookingPhase === "select" && (
            <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="font-baloo text-xl font-bold text-secondary-900">Pagamento da reserva</h2>
                <p className="font-comfortaa text-secondary-600 mt-2">
                  Selecione a condição de pagamento para confirmar sua reserva.
                </p>
              </div>

              <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
                <p className="font-comfortaa text-secondary-800 text-sm">
                  Total: <span className="font-semibold tabular-nums">{formatCurrencyBRL(onBookingTotal)}</span>
                </p>
              </div>

              {onBookingConditionsLoading ? (
                <div className="py-2 animate-pulse space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-14 rounded-xl bg-secondary-100" />
                  ))}
                </div>
              ) : onBookingConditionsError ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800" role="alert">
                  {onBookingConditionsError}
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveOnBookingPaymentAndNext();
                  }}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    {(onBookingConditions ?? []).map((c) => (
                      <label
                        key={c.id}
                        className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-secondary-50 transition-colors has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50/50"
                      >
                        <input
                          type="radio"
                          name="onBookingCondition"
                          value={c.id}
                          checked={onBookingPaymentConditionId === c.id}
                          onChange={() => {
                            setOnBookingPaymentConditionId(c.id);
                            setOnBookingPaymentMethod(c.paymentMethod);
                            setOnBookingInstallments(1);
                          }}
                          className="mt-1 w-4 h-4 text-accent-500 border-secondary-300 focus:ring-accent-500"
                        />
                        <span className="min-w-0">
                          <span className="block font-comfortaa font-medium text-secondary-900">{c.name}</span>
                          <span className="block font-comfortaa text-xs text-secondary-600 mt-1">
                            {c.paymentMethod === "CREDIT_CARD"
                              ? `Cartão de crédito • até ${Math.max(1, c.maxInstallments)}x`
                              : "PIX"}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>

                  {selectedOnBookingCondition?.paymentMethod === "CREDIT_CARD" && (
                    <div className="pl-1 space-y-2">
                      <label className="block font-comfortaa text-sm font-medium text-secondary-700">
                        Parcelamento
                      </label>
                      <select
                        value={onBookingInstallments}
                        onChange={(e) => setOnBookingInstallments(Number(e.target.value))}
                        className="w-full max-w-xs px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white"
                      >
                        {onBookingInstallmentOptions.map((n) => (
                          <option key={n} value={n}>
                            {n}x {onBookingTotal > 0 ? formatCurrencyBRL(onBookingTotal / n) : "—"}
                          </option>
                        ))}
                      </select>
                      {selectedOnBookingCondition.minimumParcel > 0 ? (
                        <p className="font-comfortaa text-xs text-secondary-500">
                          Parcela mínima: {formatCurrencyBRL(selectedOnBookingCondition.minimumParcel)}.
                        </p>
                      ) : null}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onBack}
                      className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={onBookingSaving || onBookingPaymentConditionId == null}
                      className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 disabled:opacity-60 transition-all"
                    >
                      {onBookingSaving ? "Gerando pagamento…" : "Continuar"}
                    </button>
                  </div>
                </form>
              )}
            </section>
          )}

          {onBookingPhase === "pay" && (
            <StepPaymentFinish
              {...stepProps}
              isSaving={onBookingSaving}
              paymentIntentResponse={onBookingPaymentIntentResponse}
              paymentConditionId={selectedOnBookingCondition?.id ?? null}
              onNext={() => setStepIndex((i) => Math.min(i + 1, totalSteps - 1))}
              paymentSuccessPrimaryAction={{
                label: "Continuar",
                onClick: () => setStepIndex((i) => Math.min(i + 1, totalSteps - 1)),
              }}
            />
          )}
        </>
      )}

      {onBookingItems.length > 0 && stepIndex === onBookingStepStartIdx + 2 && (
        <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
          <h2 className="font-baloo text-xl font-bold text-secondary-900">Finalizar reserva</h2>
          <p className="font-comfortaa text-secondary-600 mt-2">
            Reserva confirmada com sucesso. Você já pode acompanhar os detalhes da sua viagem.
          </p>
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              Voltar
            </button>
            {payment?.tripId ? (
              <Link
                href={`/app/viagens/${payment.tripId}`}
                className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 transition-all inline-flex items-center justify-center"
              >
                Ir para a viagem
              </Link>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}

