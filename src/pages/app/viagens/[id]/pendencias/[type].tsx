import { PageApp } from "@/features";
import { EmptyState } from "@/ui";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Pendências da Viagem";

// TODO: Remove this page in favor of specifying the route
export default function TripPendingSwitcherRoute() {
  const idParam = useIdParam();

  return (
    <PageApp
      headerOptions={{ title, backUrl: `/app/viagens/${idParam}/pendencias` }}
      seo={{ title }}
    >
      <EmptyState text="Pendência não encontrada" />;
    </PageApp>
  );
}
