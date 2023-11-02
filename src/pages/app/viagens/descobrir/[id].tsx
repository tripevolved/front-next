import { PageApp, MatchedDestinationsPage } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Descobrir viagem";

export default function MatchedDestinationsPageRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <MatchedDestinationsPage />
    </PageApp>
  );
}
