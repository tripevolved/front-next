import type { TripDiscoverGoToStepName } from "@/features";

import { useEffect, useMemo, useState } from "react";
import { GROUP_STEPS } from "./steps";
import { useRouter } from "next/router";
import { useAnimation } from "@/utils/hooks/animation.hook";

const INITIAL_CURRENT_INDEX = 0;

export function TripDiscoverSteps() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(INITIAL_CURRENT_INDEX);
  const slider = useAnimation()

  const { component: Component, ...stepProps } = useMemo(
    () => GROUP_STEPS[currentIndex],
    [currentIndex]
  );

  const preventNextIndex = (nextIndex: number) =>
    nextIndex < 0 ? 0 : nextIndex >= GROUP_STEPS.length ? GROUP_STEPS.length - 1 : nextIndex;

  const handleSetCurrentIndex = (nextIndex: number) => {
    const index = preventNextIndex(nextIndex);
    slider.trigger(index > currentIndex);
    setCurrentIndex(index);
    const stepName = GROUP_STEPS[index].name;
    router.push({ ...router, query: { stepName } }, undefined, { shallow: true });
  };

  const goToStepName: TripDiscoverGoToStepName = (stepName) => {
    const nextIndex = GROUP_STEPS.findIndex(({ name }) => name === stepName);
    console.log(nextIndex)
    if (nextIndex < 0) return;
    handleSetCurrentIndex(nextIndex);
  };

  const handleNext = (offset = 1) =>
    handleSetCurrentIndex(preventNextIndex(currentIndex + offset));

  useEffect(() => {
    if (!router.isReady) return;
    const stepName = router.query.stepName;
    if (typeof stepName === "string") goToStepName(stepName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div style={slider.style}>
      <Component
        goToStepName={goToStepName}
        onNext={() => handleNext(1)}
        onPrevious={() => handleNext(-1)}
        {...stepProps}
      />
    </div>
  );
}
