import type { StepComponentProps } from "@/features";
import { Grid, Notification } from "mars-ds";
import { useRef, useState } from "react";
import { TripTypeStep } from "./trip-type-step.component";
import { TripCharacteristicsStep } from "./trip-characteristics-step.component";
import { TripTravelerProfileStep } from "./trip-traveler-profile-step.component";
import { TripScriptsApiService } from "@/services/api";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { useIdParam } from "@/utils/hooks/param.hook";

const TRIP_STEPS = [
  {
    title: "Que tipo de viagem você quer?",
    name: "trip-type",
    component: TripTypeStep,
  },
  {
    title: "O que não pode faltar no seu roteiro?",
    name: "trip-characteristics",
    component: TripCharacteristicsStep,
  },
  {
    title: "Temos uma ideia do que você quer",
    name: "trip-traveler-profile",
    component: TripTravelerProfileStep,
  }
];

const DEFAULT_INITIAL_INDEX = 0;

export const TripScriptParametersStep = ({ onNext }: StepComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);

  const idParam = useIdParam();
  const tripId = String(idParam);

  const animation = useAnimation();

  const data = useRef<Record<string, any>>({});

  const handleSubmit = async () => {
    try {
      // @ts-ignore
      const result = await TripScriptsApiService.postParameters({ tripId, ...data.current });

      onNext();
    } catch (error) {
      Notification.error("Devido à um erro não foi possível criar a sua trip.");
    }
  };

  const handleNext = (newData?: Record<string, any>) => {
    if (newData) {
      data.current = { ...data.current, ...newData };
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < TRIP_STEPS.length) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      handleSubmit();
    }
  };

  const { component: Component } = TRIP_STEPS[currentIndex];

  return (
    <Grid gap={16}>
      <div style={animation.style}>
        <Component
          onNext={handleNext}
          onPrevious={() => setCurrentIndex((state) => state - 1)}
          goToStepName={() => undefined}
        />
      </div>
    </Grid>
  );
};
