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

  const [flight] = transportationData.flightView.flightDetails;

  return (
    <div className={`${cn} flex-column py-lg px-md gap-md`} {...props}>
      <Text heading color="var(--color-brand-1)">
        Detalhes do voo
      </Text>
      <Box className="flight-details-painel__flight">
        {/* <Text>Voo de ida</Text> */}
        <FlightCard flight={flight} />
      </Box>
      {children}
    </div>
  );
}
