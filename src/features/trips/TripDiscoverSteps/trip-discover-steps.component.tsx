import type { TripDiscoverStepsProps, TripDiscoverGoToStepName } from "@/features";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useMemo, useState } from "react";
import { Grid } from "mars-ds";
import { GROUP_STEPS } from "./steps";
import { useRouter } from "next/router";

const INITIAL_CURRENT_INDEX = 5;

export function TripDiscoverSteps({ className, children, ...props }: TripDiscoverStepsProps) {
  const router = useRouter();

  const cn = makeCn("trip-discover-steps", className)();

  const [currentIndex, setCurrentIndex] = useState(INITIAL_CURRENT_INDEX);

  const { component: Component, ...stepProps } = useMemo(
    () => GROUP_STEPS[currentIndex],
    [currentIndex]
  );

  const preventNextIndex = (nextIndex: number) =>
    nextIndex < 0 ? 0 : nextIndex >= GROUP_STEPS.length ? GROUP_STEPS.length - 1 : nextIndex;

  const handleSetCurrentIndex = (nextIndex: number) => {
    const index = preventNextIndex(nextIndex);
    setCurrentIndex(index);
    const stepName = GROUP_STEPS[index].name;
    router.push({ ...router, query: { stepName }}, undefined, { shallow: true })
  };

  const goToStepName: TripDiscoverGoToStepName = (stepName) => {
    const nextIndex = GROUP_STEPS.findIndex(({ name }) => name === stepName);
    handleSetCurrentIndex(nextIndex);
  };

  const handleNext = (offset = 1) => setCurrentIndex((index) => preventNextIndex(index + offset));

  return (
    <Grid className={cn} {...props}>
      <Component
        goToStepName={goToStepName}
        onNext={() => handleNext(1)}
        onPrevious={() => handleNext(-1)}
        {...stepProps}
      />
    </Grid>
  );
}
