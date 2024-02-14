import { useRef, useState } from "react";
import { StepConfiguration } from "../TripSteps/step-configuration";
import { StepFinish } from "../TripSteps/step-finish";
import { StepRoomChoice } from "../TripSteps/step-room-choice";
import type { TripEditConfigurationProps } from "./trip-edit-configuration.types";

import { useAnimation } from "@/utils/hooks/animation.hook";
import { ModalContent, StepsLoader } from "@/ui";
import { TripsApiService } from "@/services/api";
import { Notification } from "mars-ds";

const CONFIG_STEPS = [
  {
    title: "Quando e quem?",
    name: "configuration",
    component: StepConfiguration,
  },
  {
    title: "Pessoas da viagem",
    name: "finish",
    component: StepFinish,
  },
  {
    title: "Quartos",
    name: "rooms",
    component: StepRoomChoice,
  }
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
  tripId,
  budget,
  numAdults,
  numChildren,
  childrenAges,
  rooms,
  endDate,
  startDate,
}: TripEditConfigurationProps) {
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);
  const [submitting, setSubmitting] = useState(false);

  const data = useRef<Record<string, any>>({ budget, numAdults, numChildren, childrenAgeInfo: childrenAges, rooms, endDate, startDate });

  const animation = useAnimation();

  const handleSubmit = async () => {
    data.current = { ...data.current, tripId };
    try {
      // @ts-ignore
      const response = await TripsApiService.setTripConfiguration({ ...data.current });
      if (response.message) Notification.warning(response.message);
      setSubmitting(true);
    } catch (error) {
      setSubmitting(false);
      Notification.error("Devido à um erro não foi possível editar a sua trip.");
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

  const { component: Component } = CONFIG_STEPS[currentIndex];

  if (submitting) {
    return (
      <ModalContent>
        <StepsLoader
          steps={LOADING_STEPS}
          milliseconds={MILLISECONDS}
          onFinish={() => location.reload()}
        />
      </ModalContent>
    );
  }

  return (
    <ModalContent heading="Configurações da Viagem" className="mt-lg">
      <div className="mt-lg" style={animation.style}>
        <Component
          onNext={handleNext}
          goToStepName={() => {}}
          {...data.current}
          onPrevious={() => setCurrentIndex((state) => state - 1)}
        />
      </div>
    </ModalContent>
  );
}
