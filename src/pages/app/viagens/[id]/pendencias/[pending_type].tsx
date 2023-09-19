import { PageApp, PendingsSwitcher } from "@/features";

export default function TripPendingSwitcherRoute() {
  return (
    <PageApp seo={{ title: "Pendências da Viagem" }}>
      <PendingsSwitcher />
    </PageApp>
  );
}
