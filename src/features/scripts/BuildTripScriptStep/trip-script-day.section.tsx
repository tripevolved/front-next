import { TripScriptActionOrSuggestion } from "@/features";
import { Card, Grid, Icon, Loader } from "mars-ds";
import { Box, EmptyState, Text } from "@/ui";
import { TripScriptsApiService } from "@/services/api";
import useSwr from "swr";
import { TripScriptDay } from "@/core/types";
import { TripScriptDaySectionProps } from "@/features";
import { TripScriptFreeDay } from "../TripScriptPanel/trip-script-free-day.component";

export const TripScriptDaySection = ({ tripId, day }: TripScriptDaySectionProps) => {
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
    <Grid className="trip-script-day-section" key={day}>
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
              return TripScriptActionOrSuggestion(tripScriptAction, true);
            })}
          </>
        ) : (
          <TripScriptFreeDay />
        )}
      </div>
    </Grid>
  );
}