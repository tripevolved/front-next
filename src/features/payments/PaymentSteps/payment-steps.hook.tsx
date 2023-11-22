import { useMemo, useState } from "react";
import { STEPS, STEP_NAMES } from "./payment-steps.constants";
import { useTripDetails } from "@/features/trips/TripDetailsPage/trip-details.hook";
import { delay } from "@/utils/helpers/async.helpers";

export const usePaymentSteps = () => {
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, isLoading, data: trip } = useTripDetails();

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

  const isLastStep = position === STEPS.length;
  const isFirstStep = !index;
  const { component: Component } = STEPS[index];
  const children = useMemo(() => {
    if (error) return <div>erro</div>;
    if (isLoading) return <div>Carregando</div>;
    if (!trip) return <div>Não encontrado</div>;
    return <Component trip={trip} onNext={onNext} />;
  }, [Component, error, isLoading, trip]);

  return {
    isLoading,
    isSubmitting,
    error,
    trip,
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
