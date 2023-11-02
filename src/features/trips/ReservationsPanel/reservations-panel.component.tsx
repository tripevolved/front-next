import { EmptyState } from "@/ui";
import { Tabs } from "mars-ds";
import { FlightsReservationsSection } from "./flights-reservations.section";
import { StaysReservationsSection } from "./stays-reservations.section";
import { useIdParam } from "@/utils/hooks/param.hook";

export function ReservationsPanel() {
  const idParam = useIdParam();

  const tabs = [
    { label: "Voos", children: <FlightsReservationsSection /> },
    { label: "Hospedagens", children: <StaysReservationsSection tripId={idParam!} /> },
    {
      label: "Atrações e restaurantes",
      children: <EmptyState text="Não há atrações e restaurantes reservados para esta viagem" />,
    },
  ];

  return <Tabs tabs={tabs} />;
}
