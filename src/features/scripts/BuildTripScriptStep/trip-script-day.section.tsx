import { Grid, Loader } from "mars-ds";
import { EmptyState } from "@/ui";

import { TripScriptsApiService } from "@/services/api";
import useSwr from "swr";

import { TripScriptDay } from "@/core/types";
import { TripScriptDaySectionProps } from "@/features";
import { TripScriptDayComponent } from "../TripScriptDay";

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

  data.day = day;

  return (
    <TripScriptDayComponent 
      tripId={tripId}
      day={day}
      dayDetail={data}
    />
  );
}