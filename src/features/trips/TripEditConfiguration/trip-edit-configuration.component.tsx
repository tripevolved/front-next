import { useRef, useState } from "react";
import { StepConfiguration } from "../TripSteps/step-configuration";
import { StepFinish } from "../TripSteps/step-finish";
import type { TripEditConfigurationProps } from "./trip-edit-configuration.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { Box, Text } from "@/ui";

const CONFIG_STEPS = [
  {
    title: "Quando e quem?",
    name: "configuration",
    component: StepConfiguration,
  },
  {
    title: "Finalização",
    name: "finish",
    component: StepFinish,
  },
];

const DEFAULT_INITIAL_INDEX = 0;

export function TripEditConfiguration({
  className,
  children,
  sx,
  ...props
}: TripEditConfigurationProps) {
  const cn = makeCn("trip-edit-configuration", className)(sx);
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);

  const data = useRef<Record<string, any>>({});

  const animation = useAnimation();

  const handleNext = (newData?: Record<string, any>) => {
    if (newData) {
      data.current = { ...data.current, ...newData };
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < CONFIG_STEPS.length) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      // Do something
    }
  };

  const { component: Component } = CONFIG_STEPS[currentIndex];

  return (
    <div className={`${cn} gap-lg p-lg`} {...props}>
      <Text heading style={{ color: "var(--color-brand-1)" }}>
        Configurações da sua Viagem
      </Text>
      <Box style={animation.style}>
        <Component
          onNext={handleNext}
          onPrevious={() => setCurrentIndex((state) => state - 1)}
          goToStepName={() => undefined}
        />
      </Box>
    </div>
  );
}
