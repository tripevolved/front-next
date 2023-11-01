import type { FlightDetailsPainelProps } from "./flight-details-painel.types";

import { Text, Box } from "@/ui";
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

  const { outboundFlightDetails, returnFlightDetails } = transportationData.flightView;

  return (
    <div className={`${cn} w-100 p-xl`} {...props}>
      <div className="w-100 flight-details-painel__container flex-column  gap-xl">
        <Text heading style={{ color: "var(--color-brand-1)" }}>
          Detalhes do voo
        </Text>
        <Box className="flight-details-painel__container__flight w-100 flex-column gap-md">
          <Text size="xl">Voo de ida</Text>
          {outboundFlightDetails.map((flight, i) => (
            <FlightCard flight={flight} key={i} />
          ))}
        </Box>
        <Box className="flight-details-painel__container__flight flex-column gap-md">
          <Text size="xl">Voo de volta</Text>
          {returnFlightDetails.map((flight, i) => (
            <FlightCard flight={flight} key={i} />
          ))}
        </Box>
      </div>
    </div>
  );
}
