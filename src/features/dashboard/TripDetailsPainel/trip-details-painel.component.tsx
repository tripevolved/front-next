import { Box } from "@/ui";
import type { TripDetailsPainelProps } from "./trip-details-painel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripAbstract } from "@/core/types";
import { TripAccordeon } from "../TripAccordeon";

const mockTrips: TripAbstract[] = [
  {
    id: "ieuyfgas89w",
    destinationProposal: {
      mainChoice: {
        destinationId: "654a368w1dvasr8as",
        isYourChoice: true,
        matchScore: 92,
        name: "Ouro Preto",
        price: 6584,
        uniqueName: "ouro-preto",
      },
    },
    viewType: 5,
    tripDashboard: {
      attractionsNumber: 7,
      pedingActions: 2,
      documents: 5,
      flightAndTickets: 2,
      tips: 3,
    },
  },
];

export function TripDetailsPainel({ className, sx, ...props }: TripDetailsPainelProps) {
  const cn = makeCn("trip-details-painel", className)(sx);

  return (
    <Box className={cn} {...props}>
      {mockTrips.map((trip, i) => (
        <TripAccordeon {...trip} key={i} />
      ))}
    </Box>
  );
}
