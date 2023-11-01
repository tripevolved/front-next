import { PageApp, TripScriptPreviewPanel } from "@/features";
import { useRouter } from "next/router";

const title = "Prévia do Roteiro";

export default function TripScriptPanelRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/criar/${idParam}` }} seo={{ title }}>
      <TripScriptPreviewPanel />
    </PageApp>
  );
}
