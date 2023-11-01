import { PageApp, TripScriptPreviewPanel } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Prévia do Roteiro";

export default function TripScriptPanelRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/criar/${idParam}` }} seo={{ title }}>
      <TripScriptPreviewPanel />
    </PageApp>
  );
}
