import { PageApp, PageAppBody, TripScriptPanel } from "@/features";
import { useRouter } from "next/router";

const title = "Roteiro da viagem - Prévia";

export default function TripScriptPanelRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp
      headerOptions={{
        title: "Roteiro",
        subtitle: "Veja todos os eventos da sua viagem",
        backUrl: `/app/viagens/${idParam}`,
      }}
      seo={{ title }}
    >
      <PageAppBody>
        <TripScriptPanel />
      </PageAppBody>
    </PageApp>
  );
}
