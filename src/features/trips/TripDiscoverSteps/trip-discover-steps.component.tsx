import type { TripDiscoverStepsProps, TripDiscoverOnNextStep } from "@/features";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useMemo, useState } from "react";
import { StepsProgressBar } from "@/ui";
import { Grid } from "mars-ds";
import { GROUP_STEPS } from "./steps";

const INITIAL_CURRENT_INDEX = 1;

export function TripDiscoverSteps({ className, children, sx, ...props }: TripDiscoverStepsProps) {
  const cn = makeCn("trip-discover-steps", className)(sx);

  const [currentIndex, setCurrentIndex] = useState(INITIAL_CURRENT_INDEX);
  const [total, setTotal] = useState(GROUP_STEPS.length);

  const preventNextIndex = (nextIndex: number) =>
    nextIndex < 0 ? 0 : nextIndex >= GROUP_STEPS.length ? GROUP_STEPS.length - 1 : nextIndex;

  const handleSetCurrentIndex = (nextIndex: number) => {
    setCurrentIndex(preventNextIndex(nextIndex));
  };

  const handleNextStep: TripDiscoverOnNextStep = (stepName) => {
    const nextIndex = GROUP_STEPS.findIndex(({ name }) => name === stepName);
    handleSetCurrentIndex(nextIndex);
  };

  const handleNext = (offset = 1) => setCurrentIndex((index) => preventNextIndex(index + offset));

  const { component: Component, ...stepProps } = useMemo(
    () => GROUP_STEPS[currentIndex],
    [currentIndex]
  );

  return (
    <Grid className={cn} {...props}>
      <StepsProgressBar position={currentIndex} total={total} />
      <Component
        onNextStep={handleNextStep}
        onNext={() => handleNext(1)}
        onPrevious={() => handleNext(-1)}
        {...stepProps}
      />
    </Grid>
  );
}
