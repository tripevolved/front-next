import type { PaymentPayloadData, PaymentData } from "./payment-steps.types";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_PAYLOAD_VALUES, STEPS, STEP_NAMES } from "./payment-steps.constants";
import { useTripDetails } from "@/features/trips/TripDetailsPage/trip-details.hook";
import { delay } from "@/utils/helpers/async.helpers";
import { useIdParam } from "@/utils/hooks/param.hook";
import { usePurchase } from "../TripPurchasePage/trip-purchase-page.hook";

export const usePaymentSteps = () => {
  const [payload, setPayload] = useState<PaymentPayloadData>(DEFAULT_PAYLOAD_VALUES);
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, isLoading, data } = useCheckoutData();

  const initialized = useRef(false);

  const handleSetPayload = (newPayload: Partial<PaymentPayloadData>) => {
    setPayload((state) => ({ ...state, ...newPayload }));
  };

  const position = index + 1;

  const onNext = () => {
    setIndex((state) => state + 1);
  };

  const onPrevious = () => {
    setIndex((state) => state - 1);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await delay();
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (initialized.current || !data) return;
    handleSetPayload({
      payer: data.payer,
      address: data.address,
    });
    initialized.current = true;
  }, [data]);

  const isLastStep = position === STEPS.length;
  const isFirstStep = !index;
  const { component: Component } = STEPS[index];
  const children = useMemo(() => {
    if (error) return <div>erro</div>;
    if (isLoading) return <div>Carregando</div>;
    if (!data) return <div>Não encontrado</div>;
    return <Component {...data} onNext={onNext} payload={payload} setPayload={handleSetPayload} />;
  }, [Component, error, isLoading, data]);

  return {
    isLoading,
    isSubmitting,
    error,
    ...data,
    isFirstStep,
    isLastStep,
    children,
    position,
    onNext,
    onPrevious,
    onSubmit,
    stepNames: STEP_NAMES,
  };
};

const useCheckoutData = () => {
  const tripId = useIdParam();
  const trip = useTripDetails();
  const purchase = usePurchase(tripId);

  const error = trip.error || purchase.error;
  const isLoading = trip.isLoading || purchase.error;
  const isEmpty = !trip.data || !purchase.data;
  const data = isEmpty ? null : ({ trip: trip.data, ...purchase.data, tripId } as PaymentData);

  return { error, isLoading, data };
};
