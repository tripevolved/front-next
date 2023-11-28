import { useEffect, useMemo, useState } from "react";
import type { TemplateStepsBuilderProps } from "./template-steps-builder.types";

import { useAnimation } from "@/utils/hooks/animation.hook";
import { useRouter } from "next/router";

const INITIAL_CURRENT_INDEX = 0;

export function TemplateStepsBuilder({
  steps,
  initialIndex = INITIAL_CURRENT_INDEX,
}: TemplateStepsBuilderProps) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const slider = useAnimation();

  const { component: Component, ...stepProps } = useMemo(
    () => steps[currentIndex],
    [currentIndex, steps]
  );

  const preventNextIndex = (nextIndex: number) =>
    nextIndex < 0 ? 0 : nextIndex >= steps.length ? steps.length - 1 : nextIndex;

  const handleSetCurrentIndex = (nextIndex: number) => {
    const index = preventNextIndex(nextIndex);
    slider.trigger(index > currentIndex);
    setCurrentIndex(index);
    const stepName = steps[index].name;
    router.push({ ...router, query: { ...router.query, stepName } }, undefined, { shallow: true });
  };

  const goToStepName = (stepName: string) => {
    const nextIndex = steps.findIndex(({ name }) => name === stepName);
    if (nextIndex < 0) return;
    handleSetCurrentIndex(nextIndex);
  };

  const handleNext = (offset = 1) => handleSetCurrentIndex(preventNextIndex(currentIndex + offset));

  useEffect(() => {
    if (!router.isReady) return;
    const stepName = router.query.stepName;
    if (typeof stepName === "string") goToStepName(stepName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  console.log("PROPS", steps, steps[currentIndex]);

  return (
    <div style={slider.style}>
      <Component
        goToStepName={goToStepName}
        onNext={(data) => handleNext(1)}
        onPrevious={() => handleNext(-1)}
        {...stepProps}
      />
    </div>
  );
}
