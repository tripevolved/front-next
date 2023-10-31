import { PageApp, TripDetailsPanel } from "@/features";

const title = "Detalhes da viagem";

export default function TripDetailsPanelRoute() {
  return (
    <PageApp headerOptions={{ title, backUrl: "/app/painel" }} seo={{ title }}>
      <TripDetailsPanel />
    </PageApp>
  );
}
