import type { AllTripsPanelProps } from "./all-trips-panel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripAbstract, AllTrips } from "@/core/types";
import { HeaderUserMenu } from "../../dashboard/HeaderUserMenu";
import { TripAccordeon } from "../TripAccordeon";
import { HasTrip } from "../HasTrip";
import { useAllTrips } from "./all-trips-panel.hook";
import { useAppStore } from "@/core/store";
import { useState, useEffect } from "react";
import { EmptyState, GlobalLoader, Text } from "@/ui";

const mockTrips: TripAbstract[] = [
  {
    id: "ieuyfgas89w",
    imageUrl: null,
    period: "20 a 25 ago",
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

export function AllTripsPanel({ className, sx, ...props }: AllTripsPanelProps) {
  const cn = makeCn("all-trips-panel", className)(sx);

  const { isLoading, data, error } = useAllTrips();
  const { travelerState } = useAppStore();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(travelerState.name);
  }, [travelerState]);

  

  const getView = () => {
    if (error) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return data.currentTrip ? (
      <HasTrip trip={data.currentTrip} />
    ) : (
      <>
      <Text size="xxl">Suas viagens</Text>
      {data.otherTrips.map((trip, i) => (
        <TripAccordeon trip={trip} key={i} />
      ))}
      </>
    );
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
