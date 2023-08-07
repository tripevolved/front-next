import type { ComponentHTMLProps } from "@/core/types";

export type TripDiscoverGoToStepName = (stepName: string) => void

export interface TripDiscoverStepContentProps extends ComponentHTMLProps {
  onNext: (data?: Record<string, any>) => void;
  onPrevious: VoidFunction;
  goToStepName: TripDiscoverGoToStepName;
};
