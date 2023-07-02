import { PageApp, TripDetailsPanel } from "@/features";

export default function TripDetailsPanelRoute() {
  return (
    <PageApp seo={{ title: "Painel" }}>
      <TripDetailsPanel />
    </PageApp>
  );
}
