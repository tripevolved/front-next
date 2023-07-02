import type { TripDetailsPainelProps } from "./trip-details-painel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripAbstract, AllTrips } from "@/core/types";
import { HeaderUserMenu } from "../HeaderUserMenu";
import { TripAccordeon } from "../TripAccordeon";
import { HasTrip } from "../HasTrip";
import { useAllTrips } from "./trip-details-painel.hook";
import { useAppStore } from "@/core/store";
import { useState, useEffect } from "react";
import { EmptyState, GlobalLoader } from "@/ui";

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

  const { isLoading, data, error } = useAllTrips();
  const { travelerState } = useAppStore();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(travelerState.name);
  }, [travelerState])

  const getView = () => {
    if (error) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return data.currentTrip ? (
      <HasTrip trip={data.currentTrip} />
    ) : data.otherTrips.map((trip, i) => (
      <TripAccordeon {...trip} key={i} />
    ));
  };

  return (
    <div className={cn} {...props}>
      <HeaderUserMenu userName={name}>
        Te esperamos na sua próxima viagem
      </HeaderUserMenu>
      {getView()}
    </div>
  );
}
