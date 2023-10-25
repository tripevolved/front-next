import type { TripDetailsPanelProps } from "./trip-details-panel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { HasTrip } from "../HasTrip";
import { useAppStore } from "@/core/store";
import { EmptyState, GlobalLoader, Text } from "@/ui";
import { PageAppBody, PageAppHeader, TripDashboard } from "@/features";
import { useRouter } from "next/router";
import { TripsApiService } from "@/services/api";
import useSwr from "swr";

export function TripDetailsPanel({ className, sx, ...props }: TripDetailsPanelProps) {
  const cn = makeCn("trip-details-panel", className)(sx);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const fetcher = async () => TripsApiService.getByIdForDashboard(idParam!);
  const { isLoading, error, data } = useSwr(idParam, fetcher);

  const {
    name = "viajante"
  } = useAppStore((state) => state.travelerState);
  const firstName = name.replace(/\s.*/, "");

  const getView = () => {
    if (error) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return data.destinationProposal ? (
      <HasTrip trip={data.destinationProposal} tripId={data.id} />
    ) : data.tripDashboard ? (
      <TripDashboard tripDashboard={data.tripDashboard!} tripId={data.id} />
    ) : (
      <EmptyState text="Não foi possível abrir essa viagem" />
    );
  };

  return (
    <div className={cn} {...props}>
      <PageAppHeader backButton href={`/app/painel`}>
        <div className="trip-details-panel__header">
          <div>
            <Text heading as="div" size="sm" className="mb-xs">
              Olá, <strong>{firstName}</strong> 👋
            </Text>
            <Text size="lg">Estes são os detalhes da sua viagem</Text>
          </div>
        </div>
      </PageAppHeader>
      <PageAppBody>
        {getView()}
      </PageAppBody>
    </div>
  );
}
