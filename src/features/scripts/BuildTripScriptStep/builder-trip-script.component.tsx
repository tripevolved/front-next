import { type StepComponentProps } from "@/features";
import { Button, Grid, Loader, Notification } from "mars-ds";
import { useState } from "react";
import { ErrorState, StepsProgressBar, Text } from "@/ui";
import { TripScriptsApiService } from "@/services/api";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { useRouter } from "next/router";
import useSwr from "swr";
import { TripScriptBuilderParams } from "@/core/types";
import { TripScriptDaySection } from "./trip-script-day.section";
import { TripScriptDayTipSection } from "./trip-script-day-tip.section";

const DEFAULT_INITIAL_INDEX = 1;

export const BuildTripScriptStep = ({ onNext }: StepComponentProps) => {
  const router = useRouter();
  const tripId = String(router.query.id);
  const day = Number(router.query.day) || undefined;

  const fetcher = async () => TripScriptsApiService.getBuilderParams(tripId);
  const fetcherKey = `build-trip-script-step-${tripId}`
  const { isLoading, data, error } = useSwr<TripScriptBuilderParams>(fetcherKey, fetcher);

  const [currentIndex, setCurrentIndex] = useState(day ?? DEFAULT_INITIAL_INDEX);
  const animation = useAnimation();

  const handleFinish = async () => {
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
        <ErrorState />
      </Grid>
    );
  }

  const handleNext = () => {
    // TODO: send post to edit day

    const nextIndex = currentIndex + 1;
    if (nextIndex <= data.numDays) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      handleFinish();
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
          numDays={data.numDays}
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
  numDays: number;
}
const ScriptDay = ({ tripId, day, numDays, onNext, onPrevious }: ScriptDayProps) => {
  return (
    <>
      <TripScriptDayTipSection tripId={tripId} day={day} />
      <TripScriptDaySection tripId={tripId} day={day} />
      <Grid className="builder-trip-script-navigator" columns={day > 1 ? [1, 5] : [6]}>
        {day > 1 ? (<Button onClick={onPrevious} className="builder-trip-script-navigator__secondary-action" variant="secondary">{"<"}</Button>) : (<></>)}
        <Button onClick={onNext} className="builder-trip-script-navigator__main-action">{day == numDays ? "Concluir atrações" : `Ver roteiro do dia ${day + 1}`}</Button>
      </Grid>
    </>
  );
}
