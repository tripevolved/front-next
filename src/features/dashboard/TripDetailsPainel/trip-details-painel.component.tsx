import type { TripDetailsPainelProps } from "./trip-details-painel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripAbstract, AllTrips } from "@/core/types";
import { TripAccordeon } from "../TripAccordeon";
import { HasTrip } from "../HasTrip";

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
const mockAllTripsView: AllTrips = {
  currentTrip: null,
  otherTrips: mockTrips
}

export function TripDetailsPainel({ className, sx, ...props }: TripDetailsPainelProps) {
  const cn = makeCn("trip-details-painel", className)(sx);

  const getView = (allTripsView: AllTrips) => {
    return allTripsView.currentTrip ? (
      <HasTrip />
    ) : mockTrips.map((trip, i) => (
      <TripAccordeon {...trip} key={i} />
    ));
  };

  return (
    <div className={cn} {...props}>
      {getView(mockAllTripsView)}
    </div>
  );
}
