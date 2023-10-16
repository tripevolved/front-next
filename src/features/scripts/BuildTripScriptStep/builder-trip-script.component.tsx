import { TripScriptActionOrSuggestion, type StepComponentProps } from "@/features";
import { Button, Caption, Card, Grid, Icon, Loader, Notification } from "mars-ds";
import { useRef, useState } from "react";
import { Box, EmptyState, StepsLoader, StepsProgressBar, Text } from "@/ui";
import { TripScriptsApiService } from "@/services/api";
import { useAppStore } from "@/core/store";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { useRouter } from "next/router";
import useSwr from "swr";
import { ComponentHTMLProps, TripScript, TripScriptBuilderParams, TripScriptDay } from "@/core/types";
import { TripScriptDaySection } from "./trip-script-day.section";
import { TripScriptDayTipSection } from "./trip-script-day-tip.section";

const TRIP_STEPS = [
  {
    title: "Descobrir minha trip",
    name: "destinations",
    // component: StepDestinations,
  },
  {
    title: "",
    name: "configuration",
    // component: StepConfiguration,
  },
  {
    title: "",
    name: "trip-goal",
    // component: StepTripGoal,
  },
  {
    title: "Finalização",
    name: "finish",
    // component: StepFinish,
  },
];

const DEFAULT_INITIAL_INDEX = 1;

export const BuildTripScriptStep = ({ onNext }: StepComponentProps) => {
  const router = useRouter();
  const tripId = String(router.query.id);

  const uniqueKeyName = `${tripId}-script`;
  const fetcher = async () => TripScriptsApiService.getBuilderParams(tripId);
  const { isLoading, data, error } = useSwr<TripScriptBuilderParams>(uniqueKeyName, fetcher);

  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);
  const animation = useAnimation();

  const handleSubmit = async () => {
    try {
      onNext();      
    } catch (error) {
      Notification.error("Devido à um erro não foi possível criar a sua trip.");
    }
  };

  if (isLoading) {
    return (
      <Grid className="trip-script-builder-step">
        <Loader color="var(--color-brand-1)" size="md" />
      </Grid>
    );
  }

  if (error || !data) {
    return (
      <Grid className="trip-script-builder-step">
        <EmptyState />
      </Grid>
    );
  }

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex <= data.numDays) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      handleSubmit();
    }
  };

  return (
    <Grid gap={16}>
      <StepsProgressBar position={currentIndex} total={data.numDays} />
      <Text size="sm" heading as="p" className="color-text-primary">Roteiro - Dia {currentIndex}</Text>
      <div style={animation.style}>
        <ScriptDay
          tripId={tripId}
          day={currentIndex}
          onNext={handleNext}
          onPrevious={() => setCurrentIndex((state) => state - 1)}
          goToStepName={() => undefined} />
      </div>
    </Grid>
  );
};

interface ScriptDayProps extends StepComponentProps {
  tripId: string;
  day: number;
}
const ScriptDay = ({ tripId, day, onNext, onPrevious }: ScriptDayProps) => {
  return (
    <>
      <TripScriptDayTipSection tripId={tripId} day={day} />
      <TripScriptDaySection tripId={tripId} day={day} />
      <div className="">
        {day > 1 ? (<Button onClick={onPrevious}>{"<-"}</Button>) : (<></>)}
        <Button onClick={onNext}>Ver roteiro do dia {day + 1}</Button>
      </div>
    </>
  );
}