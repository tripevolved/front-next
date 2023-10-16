import { Grid, Image, Loader } from "mars-ds";
import { Box, EmptyState, Text } from "@/ui";
import { TripScriptsApiService } from "@/services/api";
import useSwr from "swr";
import { TripScriptDayTip } from "@/core/types";
import { TripScriptDaySectionProps } from "@/features";

export const TripScriptDayTipSection = ({ tripId, day }: TripScriptDaySectionProps) => {
  const uniqueKeyName = `${tripId}-script-day-${day}-tip`;
  const fetcher = async () => TripScriptsApiService.getDayTip(tripId, day);
  const { isLoading, data, error } = useSwr<TripScriptDayTip>(uniqueKeyName, fetcher);

  if (isLoading) {
    return (
      <Grid className="trip-script-builder-step">
        <Loader color="var(--color-brand-1)" size="md" />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid className="trip-script-builder-step">
        <EmptyState />
      </Grid>
    );
  }

  return (!data ? (<></>) :
    (<Grid className="trip-script-day-tip" key={day} gap={18}>
      <Image src={"/assets/script/tip.svg"} alt="target" width={48} height={48} className="trip-script-day-tip__header-image"/>
      <Text size="xl" className="trip-script-day-tip__header-title">
        Dica da Trip Evolved
      </Text>
      <Box className="trip-script-day-tip__body">
        <Text size="md">
          {data.message}
        </Text>
      </Box>
    </Grid>)
  );
}