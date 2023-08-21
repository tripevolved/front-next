import type { ReservationsPanelProps } from "./reservations-panel.types";

import { PageAppHeader, PageAppBody } from "@/features";
import { EmptyState } from "@/ui";
import { Tabs } from "mars-ds";
import { useRouter } from "next/router";
import { FlightsReservationsSection } from "./flights-reservations.section";
import { StaysReservationsSection } from "./stays-reservations.section";

export function ReservationsPanel({ className, sx, ...props }: ReservationsPanelProps) {
  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const tabs = [
    { label: "Voos", children: <FlightsReservationsSection /> },
    { label: "Hospedagens", children: <StaysReservationsSection tripId={idParam!} /> },
    { label: "Atrações e restaurantes", children: <EmptyState text="Não há atrações e restaurantes reservados para esta viagem" /> }
  ];

  return (
    <>
      <PageAppHeader title="Voos e Reservas" backButton href={`/app/viagens/${idParam}`} />
      <PageAppBody>
        <Tabs tabs={tabs} />
      </PageAppBody>
    </>
  );
}
