import { PageApp, PendingsSwitcher } from "@/features";

export default function TripPendingRoute() {
  return (
    <PageApp seo={{ title: "Pendências da Viagem" }}>
      <PendingsSwitcher />
    </PageApp>
  );
}
