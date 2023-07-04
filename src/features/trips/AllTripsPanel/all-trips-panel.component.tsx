import type { AllTripsPanelProps } from "./all-trips-panel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripListView, AllTrips } from "@/core/types";
import { HeaderUserMenu } from "../../dashboard/HeaderUserMenu";
import { TripAccordeon } from "../TripAccordeon";
import { useAllTrips } from "./all-trips-panel.hook";
import { useAppStore } from "@/core/store";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { EmptyState, GlobalLoader, Text, Box } from "@/ui";

const mockData: AllTrips = {
  otherTrips: [
    {
      id: "s68df769s8dfs",
      period: "15 dias",
      title: "Rio Branco",
      images: [
        {
          alt: "Paisagem de Rio Branco",
          sources: [
            {
              type: "xl",
              url: "https://picsum.photos/seed/picsum/300",
              height: 300,
              width: 300,
            },
          ],
          title: "Rio Branco",
        },
      ],
    },
    {
      id: "s68df769s8dfs",
      period: "15 dias",
      title: "Ouro Preto",
      images: [
        {
          alt: "Paisagem de Ouro Preto",
          sources: [
            {
              type: "xl",
              url: "https://picsum.photos/seed/leaf/300",
              height: 300,
              width: 300,
            },
          ],
          title: "Ouro Preto",
        },
      ],
    },
  ],
};

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
        {mockData.otherTrips.map((trip, i) => (
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
