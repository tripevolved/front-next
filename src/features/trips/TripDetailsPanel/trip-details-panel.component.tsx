import type { TripDetailsPanelProps } from "./trip-details-panel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripAbstract } from "@/core/types";
import { HeaderUserMenu } from "../../dashboard/HeaderUserMenu";
import { HasTrip } from "../HasTrip";
import { useTripDashboard } from "./trip-details-panel.hook";
import { useAppStore } from "@/core/store";
import { useState, useEffect } from "react";
import { EmptyState, GlobalLoader } from "@/ui";
import { TripDashboard } from "@/features";

const mockTrip: TripAbstract = {
  id: "ieuyfgas89w",
  viewType: "ORGANIZATION",
  tripDashboard: {
    name: "Fernando de Noronha",
    attractionsNumber: 7,
    pedingActions: 2,
    documents: 5,
    flightAndTickets: 2,
    tips: 3,
  },
};

export function TripDetailsPanel({ className, sx, ...props }: TripDetailsPanelProps) {
  const cn = makeCn("trip-details-panel", className)(sx);

  const { isLoading, data, error } = useTripDashboard();
  const { travelerState } = useAppStore();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(travelerState.name);
  }, [travelerState]);

  const getView = () => {
    if (error) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return data.destinationProposal ? (
      <HasTrip trip={data.destinationProposal} />
    ) : (
      <TripDashboard tripDashboard={data.tripDashboard!} tripId={data.id} />
    );
  };

  return (
    <div className={cn} {...props}>
      <HeaderUserMenu userName={name}>Te esperamos na sua próxima viagem</HeaderUserMenu>
      {getView()}
    </div>
  );
}
