import { PageTrip, type TemplateStepsBuilderProps } from "@/features";
import { GROUP_STEPS } from "./trip-creation-page.steps";
import { useRef, useState } from "react";
import { useAppStore } from "@/core/store";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { useRouter } from "next/router";
import { Caption, Grid, Notification } from "mars-ds";
import { StepsLoader, StepsProgressBar } from "@/ui";
import { TripsApiService } from "@/services/api";
import { StepCityRegistration } from "../TripSteps/step-city-registration";

export const TripCreationPage = () => {
  return (
    <PageTrip seo={{ title: "Descubra sua trip" }}>
      <StepBuilder steps={GROUP_STEPS} />
    </PageTrip>
  );
};

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

const StepBuilder = ({ steps }: TemplateStepsBuilderProps) => {
  const { id: travelerId, hasValidAddress } = useAppStore((state) => state.travelerState);

  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);
  const [submitting, setSubmitting] = useState(false);

  const slider = useAnimation();
  const router = useRouter();

  const data = useRef<Record<string, any>>({ travelerId });
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
    if (nextIndex < steps.length) {
      setCurrentIndex(nextIndex);
      slider.trigger(true);
    } else {
      handleSubmit();
    }
  };

  const handleFinish = () => {
    router.replace(`/app/viagens/${tripId.current}/detalhes`);
  };

  if (!hasValidAddress) {
    steps.splice(1, 0, {
      title: "Seu endereço",
      name: "register-city",
      component: StepCityRegistration,
    });
  }

  const { component: Component } = steps[currentIndex];

  if (submitting) {
    return (
      <StepsLoader steps={LOADING_STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
    );
  }

  return (
    <Grid gap={48}>
      <Grid gap={16}>
        <Caption as="p" className="color-text-secondary">
          Sua viagem {data.current.destinationTitle ? `para ${data.current.destinationTitle}` : ""}
        </Caption>
        <StepsProgressBar position={currentIndex} total={steps.length} />
      </Grid>
      <div style={slider.style}>
        <Component
          onNext={handleNext}
          onPrevious={() => setCurrentIndex((state) => state - 1)}
          goToStepName={() => undefined}
        />
      </div>
    </Grid>
  );
};
