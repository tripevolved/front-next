import { PageApp, TripDetailsPanel } from "@/features";

export default function TripDetailsPanelRoute() {
  return (
    <PageApp seo={{ title: "Detalhes da viagem" }}>
      <TripDetailsPanel />
    </PageApp>
  );
}
