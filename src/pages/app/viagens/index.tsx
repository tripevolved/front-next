import { PageApp, TripDetailsPainel } from "@/features";

export default function DashboardRoute() {
  return (
    <PageApp seo={{ title: "Painel" }}>
      <TripDetailsPainel />
    </PageApp>
  );
}
