import type { PaymentPayloadData, PaymentData } from "./payment-steps.types";

import useSWR from "swr";
import { useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_PAYLOAD_VALUES, STEPS, STEP_NAMES } from "./payment-steps.constants";
import { useTripDetails } from "@/features/trips/TripDetailsPage/trip-details.hook";
import { delay } from "@/utils/helpers/async.helpers";
import { useIdParam } from "@/utils/hooks/param.hook";
import { usePurchase } from "./purchase.hook";
import { scrollToTop } from "@/utils/helpers/dom.helpers";
import { TravelerApiService } from "@/services/api/traveler";
import { ErrorState, GlobalLoader } from "@/ui";

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
    scrollToTop();
    setIndex((state) => state + 1);
  };

  const onPrevious = () => {
    scrollToTop();
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
      travelers: data.travelers,
    });
    initialized.current = true;
  }, [data]);

  const isLastStep = position === STEPS.length;
  const isFirstStep = !index;
  const { component: Component } = STEPS[index];
  const children = useMemo(() => {
    if (error) return <ErrorState />;
    if (isLoading) return <GlobalLoader />;
    if (!data) return <ErrorState />;
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
  const travelers = useTravelers(tripId);

  const error = trip.error || purchase.error || travelers.error;
  const isLoading = !tripId || trip.isLoading || purchase.isLoading || travelers.isLoading;
  const isEmpty = !trip.data || !purchase.data;
  const data = isEmpty
    ? null
    : ({
        trip: trip.data,
        ...purchase.data,
        tripId,
        travelers: travelers.data,
      } as PaymentData);

  return { error, isLoading, data };
};

const useTravelers = (tripId: string) => {
  const fetcherKey = tripId ? `/travelers/trip/${tripId}` : null;
  const fetcher = async () =>
    TravelerApiService.getTripTravelers(tripId)
      .then(({ travelers }) => travelers)
      .catch(() => ({ travelers: [] }));
  const { data, isLoading, error } = useSWR(fetcherKey, fetcher);
  return { data, isLoading, error };
};
