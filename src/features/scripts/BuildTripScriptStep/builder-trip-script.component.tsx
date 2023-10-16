import { TripScriptActionOrSuggestion, type StepComponentProps } from "@/features";
import { Caption, Card, Grid, Icon, Loader, Notification } from "mars-ds";
import { useRef, useState } from "react";
import { Box, EmptyState, StepsLoader, StepsProgressBar, Text } from "@/ui";
import { TripScriptsApiService } from "@/services/api";
import { useAppStore } from "@/core/store";
import { useAnimation } from "@/utils/hooks/animation.hook";
import { useRouter } from "next/router";
import useSwr from "swr";
import { ComponentHTMLProps, TripScript, TripScriptBuilderParams, TripScriptDay } from "@/core/types";

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
const DEFAULT_INITIAL_INDEX = 1;

export const BuildTripScriptStep = ({}: StepComponentProps) => {
  const router = useRouter();
  const tripId = String(router.query.id);

  const uniqueKeyName = `${tripId}-script`;
  const fetcher = async () => TripScriptsApiService.getBuilderParams(tripId);
  const { isLoading, data, error } = useSwr<TripScriptBuilderParams>(uniqueKeyName, fetcher);

  const [currentIndex, setCurrentIndex] = useState(DEFAULT_INITIAL_INDEX);
  const animation = useAnimation();

  const handleSubmit = async () => {
    try {
      // @ts-ignore
      
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

  const handleNext = (newData?: Record<string, any>) => {
    if (newData) {
      data.current = { ...data.current, ...newData };
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.numDays) {
      setCurrentIndex(nextIndex);
      animation.trigger(true);
    } else {
      handleSubmit();
    }
  };

  return (
    <Grid gap={48}>
      <StepsProgressBar position={currentIndex} total={data.numDays} />
      <Caption as="p" className="color-text-secondary">
        Roteiro - Dia 
      </Caption>
      <div style={animation.style}>
        <ScriptDay tripId={tripId} day={1}/>
        {/* <Component
          onNext={handleNext}
          onPrevious={() => setCurrentIndex((state) => state - 1)}
          goToStepName={() => undefined}
        /> */}
      </div>
    </Grid>
  );
};

interface ScriptDayProps extends ComponentHTMLProps {
  tripId: string;
  day: number;
}
const ScriptDay = ({ tripId, day }: ScriptDayProps) => {
  const uniqueKeyName = `${tripId}-script-day-${day}`;
  const fetcher = async () => TripScriptsApiService.getDaySuggestion(tripId, day);
  const { isLoading, data, error } = useSwr<TripScriptDay>(uniqueKeyName, fetcher);

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

  return (
    <div className="trip-script-day-section__border" key={day}>
      <Box className="trip-script-day-section__header">
        <Text size="lg" className="trip-script-day-section__title">
          {"Dia " + day}
        </Text>
        <Text size="md" className="trip-script-day-section__subtitle">
          {data.date}
        </Text>
      </Box>
      <div className="trip-script-day-section__content">
        {data.actions.length ? (
          <>
            {data.actions.map((tripScriptAction, j) => {
              return TripScriptActionOrSuggestion(tripScriptAction);
            })}
          </>
        ) : (
          <Card className="trip-script-action" elevation="xl">
            <div className="trip-script-action__icon-box">
              <Icon name="home" size="sm" />
            </div>
            <Box className="trip-script-action__box">
              <Text size="lg" className="trip-script-action__title">
                Dia livre
              </Text>
            </Box>
          </Card>
        )}
      </div>
    </div>
  );
}