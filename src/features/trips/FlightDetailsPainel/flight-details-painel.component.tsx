import type { FlightDetailsPainelProps } from "./flight-details-painel.types";

import { Text, Box, ErrorState } from "@/ui";
import { FlightCard } from "@/features";

import { makeCn } from "@/utils/helpers/css.helpers";

export function FlightDetailsPainel({
  className,
  children,
  transportationData,
  isModalView,
  sx,
  ...props
}: FlightDetailsPainelProps) {
  const cn = makeCn("flight-details-painel", className)(sx);
  if (transportationData.flightView === null) {
    return <ErrorState />;
  }
  const { outboundFlight, returnFlight } = transportationData.flightView;

  return (
    <div className={`${cn} w-100 p-xl`} {...props}>
      <div className="w-100 flight-details-painel__container flex flex-column gap-lg">
        <Text heading style={{ color: "var(--color-brand-1)" }}>
          Detalhes do voo
        </Text>
        <Text size="xl">Voo de ida</Text>
        <Box className="flight-details-painel__container__flight w-100 flex-column gap-md">
          {outboundFlight.flightDetails.map((flight, i) => (
            <FlightCard flight={flight} key={i} />
          ))}
        </Box>
        <Text size="xl">Voo de volta</Text>
        <Box className="flight-details-painel__container__flight flex-column gap-md">
          {returnFlight.flightDetails.map((flight, i) => (
            <FlightCard flight={flight} key={i} />
          ))}
        </Box>
      </div>
    </div>
  );
}
