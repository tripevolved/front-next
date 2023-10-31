import type { TripDetailsPanelProps } from "./trip-details-panel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { HasTrip } from "../HasTrip";
import { EmptyState, ErrorState, GlobalLoader } from "@/ui";
import { TripDashboard } from "@/features";
import { useRouter } from "next/router";
import { TripsApiService } from "@/services/api";
import useSwr from "swr";

export function TripDetailsPanel({ className, sx, ...props }: TripDetailsPanelProps) {
  const cn = makeCn("trip-details-panel", className)(sx);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const fetcher = async () => TripsApiService.getByIdForDashboard(idParam!);
  const { isLoading, error, data } = useSwr(idParam, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;
  if (data.destinationProposal) return <HasTrip trip={data.destinationProposal} tripId={data.id} />;
  if (data.tripDashboard) {
    return <TripDashboard tripDashboard={data.tripDashboard!} tripId={data.id} />;
  }
  return <EmptyState text="Não foi possível abrir essa viagem" />;
}
