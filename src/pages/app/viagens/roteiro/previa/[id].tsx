import { PageApp, TripScriptPreviewPanel } from "@/features";

export default function TripScriptPanelRoute() {
  return (
    <PageApp seo={{ title: "Roteiro da viagem - Prévia" }}>
      <TripScriptPreviewPanel />
    </PageApp>
  );
}
