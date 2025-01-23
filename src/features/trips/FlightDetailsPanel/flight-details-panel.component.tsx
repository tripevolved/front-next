import type { FlightDetailsPanelProps } from "./flight-details-panel.types";

import { Text, Box, ErrorState } from "@/ui";
import { FlightCard } from "@/features";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Button, Grid, Icon, Skeleton } from "mars-ds";

export function FlightDetailsPanel({
  className,
  children,
  sx,
  data,
  flightView,
  handleEditFlight,
  onClose,
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

  console.log(flightViewData);

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

        <div
          className="flex"
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="xl">Voo de ida</Text>
          <Button
            iconName="edit-2"
            variant="secondary"
            style={{
              border: "none",
            }}
            onClick={() => {
              onClose();
              handleEditFlight();
            }}
          >
            <span>Mudar voo</span>
          </Button>
        </div>
        <Box className="flight-details-panel__container__flight w-100 flex-column gap-md">
          {flightViewData?.outboundFlight.flightDetails.map((flight, i) => (
            <FlightCard flight={flight} key={i} />
          ))}
        </Box>
        <div
          className="flex"
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="xl">Voo de volta</Text>
          <Button
            iconName="edit-2"
            variant="secondary"
            style={{
              border: "none",
            }}
            onClick={() => {
              onClose();
              handleEditFlight();
            }}
          >
            <span>Mudar voo</span>
          </Button>
        </div>
        <Box className="flight-details-panel__container__flight flex-column gap-md">
          {flightViewData?.returnFlight.flightDetails.map((flight, i) => (
            <FlightCard flight={flight} key={i} />
          ))}
        </Box>
      </div>
    </div>
  );
}
