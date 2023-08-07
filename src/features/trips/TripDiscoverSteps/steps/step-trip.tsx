import type { TripDiscoverStepContentProps } from "@/features";
import { Caption, Grid, Notification } from "mars-ds";
import { useRef, useState } from "react";
import { StepDestinations } from "./step-destinations";
import { StepConfiguration } from "./step-configuration";
import { StepTripGoal } from "./step-trip-goal";
import { StepFinish } from "./step-finish";
import { StepsLoader, StepsProgressBar } from "@/ui";
import { TripsApiService } from "@/services/api";
import { useAppStore } from "@/core/store";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { useRouter } from "next/router";

const TRIP_STEPS = [
  {
    title: "Descobrir minha trip",
    name: "destinations",
    component: StepDestinations,
  },
  {
    title: "",
    name: "configuration",
    component: StepConfiguration,
  },
  {
    title: "",
    name: "trip-goal",
    component: StepTripGoal,
  },
  {
    title: "Finalização",
    name: "finish",
    component: StepFinish,
  },
];

const EIGHT_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = EIGHT_SECONDS_IN_MS;
const LOADING_STEPS = [
  {
    text: "Construindo sua viagem...",
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

export const StepTrip = ({}: TripDiscoverStepContentProps) => {
  const travelerId = useAppStore((state) => state.travelerState.id);

  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);
  const [submitting, setSubmitting] = useState(false);

  const animation = useAnimation();
  const router = useRouter();

  const data = useRef<Record<string, any>>({});
  const tripId = useRef("");

  const handleSubmit = async () => {
    try {
      // @ts-ignore
      const result = await TripsApiService.postCreate({ travelerId, ...data.current });
      tripId.current = result.id;
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
    if (nextIndex < TRIP_STEPS.length) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      handleSubmit();
    }
  };

  const handleFinish = () => {
    router.replace(`/app/viagens/descobrir/${tripId.current}`);
  };

  const { component: Component } = TRIP_STEPS[currentIndex];

  if (submitting) {
    return (
      <StepsLoader steps={LOADING_STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
    );
  }

  return (
    <Grid gap={48}>
      <Grid gap={16}>
        <Caption as="p" className="color-text-secondary">
          Descobrir minha trip
        </Caption>
        <StepsProgressBar position={currentIndex} total={TRIP_STEPS.length} />
      </Grid>
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

const a = {
  travelerId: "de3c2f37-197d-4100-bd6c-f2d3758fca00",
  tripBehavior: [
    {
      questionId: "f5ec7104-acb7-4d53-a29f-1a25cd9dbd11",
      answers: ["f3f44c30-7518-4da9-8bd8-61f61643ef08"],
    },
  ],
  period: { maxDays: 15, minDays: 15 },
  dates: { startDate: "2023-08-23T03:00:00.000Z", endDate: "2023-08-25T03:00:00.000Z" },
  maxBudget: 10000,
};

const b = {
  travelerId: "de3c2f37-197d-4100-bd6c-f2d3758fca00",
  tripBehavior: [
    {
      questionId: "0",
      answers: {
        questionId: "f5ec7104-acb7-4d53-a29f-1a25cd9dbd11",
        answers: ["f3f44c30-7518-4da9-8bd8-61f61643ef08", "e741eaa1-0853-4940-9f13-bc60130a768e"],
      },
    },
  ],
  period: { maxDays: 3, minDays: 3 },
  dates: { startDate: "2023-08-15T03:00:00.000Z", endDate: "2023-08-17T03:00:00.000Z" },
  maxBudget: 4000,
};
