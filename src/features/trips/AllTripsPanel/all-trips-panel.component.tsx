import type { AllTripsPanelProps } from "./all-trips-panel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { HeaderUserMenu } from "../../dashboard/HeaderUserMenu";
import { TripAccordeon } from "../TripAccordeon";
import { useAllTrips } from "./all-trips-panel.hook";
import { useAppStore } from "@/core/store";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { EmptyState, GlobalLoader, Text, Box } from "@/ui";

export function AllTripsPanel({ className, sx, ...props }: AllTripsPanelProps) {
  const cn = makeCn("all-trips-panel", className)(sx);

  const { isLoading, data, error } = useAllTrips();
  const { travelerState } = useAppStore();
  const [name, setName] = useState("");
  const router = useRouter();
  const seeAllTrips = router.query.seeAll === "true" ? true : false;

  useEffect(() => {
    setName(travelerState.name);

    if (data?.currentTrip && !seeAllTrips) {
      router.replace("/app/viagens/" + data.currentTrip.id);
    }
  }, [travelerState, router, data, seeAllTrips]);

  const getView = () => {
    if (error) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return data.currentTrip && !seeAllTrips ? (
      <></>
    ) : (
      <>
        <Text size="xxl" style={{ fontWeight: 700 }}>
          Suas viagens
        </Text>
        {data.otherTrips.map((trip, i) => (
          <TripAccordeon trip={trip} key={i} />
        ))}
      </>
    );
  };

  return (
    <div className={cn} {...props}>
      <HeaderUserMenu userName={name}>Te esperamos na sua próxima viagem</HeaderUserMenu>
      <Box className="all-trips-panel__box">{getView()}</Box>
    </div>
  );
}
