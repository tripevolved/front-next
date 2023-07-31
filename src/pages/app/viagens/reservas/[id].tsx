import { PageApp, ReservationsPanel } from "@/features";

export default function ReservationsRoute() {
  return (
    <PageApp seo={{ title: "Voos e Reservas" }}>
      <ReservationsPanel />
    </PageApp>
  );
}
