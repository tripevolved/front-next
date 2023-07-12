import { PageApp, TripScriptPanel } from "@/features";

export default function TripScriptPanelRoute() {
  return (
    <PageApp seo={{ title: "Roteiro da viagem - Prévia" }}>
      <TripScriptPanel />
    </PageApp>
  );
}
