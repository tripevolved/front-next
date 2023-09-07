import { useRef, useState } from "react";
import { StepConfiguration } from "../TripSteps/step-configuration";
import { StepFinish } from "../TripSteps/step-finish";
import type { TripEditConfigurationProps } from "./trip-edit-configuration.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { Box, StepsLoader, Text } from "@/ui";
import { TripsApiService } from "@/services/api";
import { Notification } from "mars-ds";

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
const NINE_SECONDS_IN_MS = 9 * 1000;
const MILLISECONDS = NINE_SECONDS_IN_MS;
const LOADING_STEPS = [
  {
    text: "Reconstruindo sua viagem...",
    iconName: "settings",
  },
  {
    text: "Procurando atrações para seu roteiro...",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];
const DEFAULT_INITIAL_INDEX = 0;

export function TripEditConfiguration({
  className,
  children,
  sx,
  tripId,
  ...props
}: TripEditConfigurationProps) {
  const cn = makeCn("trip-edit-configuration", className)(sx);
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);
  const [submitting, setSubmitting] = useState(false);

  const data = useRef<Record<string, any>>({});

  const animation = useAnimation();

  const handleSubmit = async () => {
    data.current = { ...data.current, tripId };
    try {
      // @ts-ignore
      const result = await TripsApiService.setTripConfiguration({ ...data.current });
      setSubmitting(true);
    } catch (error) {
      setSubmitting(false);
      Notification.error("Devido à um erro não foi possível criar a sua trip.");
    }
  };

  const handleNext = (newData?: Record<string, any>) => {
    if (newData) {
      data.current = { ...data.current, ...newData };
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < CONFIG_STEPS.length) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      handleSubmit();
    }
  };

  const handleFinish = () => {
    location.reload();
  };

  const { component: Component } = CONFIG_STEPS[currentIndex];

  if (submitting) {
    return (
      <div style={{ width: "100%", height: 500, display: "flex", alignItems: "center" }}>
        <StepsLoader steps={LOADING_STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
      </div>
    );
  }

  return (
    <div className={`${cn} gap-lg p-lg`} {...props}>
      <Text
        heading
        size="md"
        style={{ color: "var(--color-brand-1)", textAlign: "left", width: "100%" }}
      >
        Configurações da Viagem
      </Text>
      <Box style={animation.style}>
        <Component
          onNext={handleNext}
          onPrevious={() => setCurrentIndex((state) => state - 1)}
        />
      </Box>
    </div>
  );
}
