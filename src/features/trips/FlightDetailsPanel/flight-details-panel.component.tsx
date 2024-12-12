import type { FlightDetailsPanelProps } from "./flight-details-panel.types";

import { Text, Box, ErrorState } from "@/ui";
import { FlightCard } from "@/features";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Grid, Skeleton } from "mars-ds";

export function FlightDetailsPanel({
  className,
  children,
  sx,
  data,
  flightView,
  ...props
}: FlightDetailsPanelProps) {
  const LoadingSkeleton = () => (
    <Grid className="py-md flex flex-col gap-3" columns={{ sm: 2, md: 1 }}>
      <Skeleton height={50} active />
      {[1, 2, 3].map((key) => (
        <Skeleton key={key} active height={230} />
      ))}
    </Grid>
  );

  const flightViewData = data?.flightView || flightView;

  console.log("isReady ->", data?.isReady);
  console.log("flightView", flightView);

  const cn = makeCn("flight-details-panel", className)(sx);
  if ((data || flightView) === null) {
    return <ErrorState />;
  }

  if (!data?.isReady && !flightView) {
    return <LoadingSkeleton />;
  }

  return (
    <div className={`${cn} w-100 p-xl`} {...props}>
      <div className="w-100 flight-details-panel__container flex flex-column gap-lg">
        <Text heading style={{ color: "var(--color-brand-1)" }}>
          Detalhes do voo
        </Text>
        <Text size="xl">Voo de ida</Text>
        <Box className="flight-details-panel__container__flight w-100 flex-column gap-md">
          {flightViewData?.outboundFlight.flightDetails.map((flight, i) => (
            <FlightCard flight={flight} key={i} />
          ))}
        </Box>
        <Text size="xl">Voo de volta</Text>
        <Box className="flight-details-panel__container__flight flex-column gap-md">
          {flightViewData?.returnFlight.flightDetails.map((flight, i) => (
            <FlightCard flight={flight} key={i} />
          ))}
        </Box>
      </div>
    </div>
  );
}
