import type { ComponentHTMLProps } from "@/core/types";
import type { TripDiscoverStep } from "@/features";

export type TripDiscoverOnNextStep = (stepName: TripDiscoverStep) => void

export interface TripDiscoverStepContentProps extends ComponentHTMLProps {
  onNext: VoidFunction;
  onPrevious: VoidFunction;
  onNextStep: TripDiscoverOnNextStep;
};
