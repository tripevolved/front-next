import type { TripDetailsPanelProps } from "./trip-details-panel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripAbstract } from "@/core/types";
import { HeaderUserMenu } from "../../dashboard/HeaderUserMenu";
import { HasTrip } from "../HasTrip";
import { useTripDashboard } from "./trip-details-panel.hook";
import { useAppStore } from "@/core/store";
import { useState, useEffect } from "react";
import { EmptyState, GlobalLoader, Text } from "@/ui";
import { PageAppHeader, TripDashboard } from "@/features";
import { Avatar } from "mars-ds";

export function TripDetailsPanel({ className, sx, ...props }: TripDetailsPanelProps) {
  const cn = makeCn("trip-details-panel", className)(sx);

  const {
    name = "viajante",
    hasCurrentTrip,
    travelerProfile,
  } = useAppStore((state) => state.travelerState);
  const firstName = name.replace(/\s.*/, "");

  const { isLoading, data, error } = useTripDashboard();
  const { travelerState } = useAppStore();

  const getView = () => {
    if (error) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return data.destinationProposal ? (
      <HasTrip trip={data.destinationProposal} tripId={data.id} />
    ) : (
      <TripDashboard tripDashboard={data.tripDashboard!} tripId={data.id} />
    );
  };

  return (
    <div className={cn} {...props}>
      {/* <HeaderUserMenu userName={name}>Te esperamos na sua próxima viagem</HeaderUserMenu> */}
      <PageAppHeader>
        <div className="trip-details-panel__header">
          <Avatar size="xl" thumbnail="/brand/logo-symbol-circle.svg" />
          <div>
            <Text heading as="div" size="sm" className="mb-xs">
              Olá, <strong>{firstName}</strong> 👋
            </Text>
            <Text size="lg">Estes são os detalhes da sua viagem</Text>
          </div>
        </div>
      </PageAppHeader>
      {getView()}
    </div>
  );
}
