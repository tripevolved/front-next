import { PageApp, TripScriptPanel } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Roteiro da viagem - Prévia";

export default function TripScriptPanelRoute() {
  const idParam = useIdParam();
  return (
    <PageApp
      headerOptions={{
        title: "Roteiro",
        subtitle: "Veja todos os eventos da sua viagem",
        backUrl: `/app/viagens/${idParam}`,
      }}
      seo={{ title }}
    >
      <TripScriptPanel />
    </PageApp>
  );
}
