import { PageApp, MatchedDestinationsPage } from "@/features";
import { useRouter } from "next/router";

const title = "Descobrir viagem";

export default function MatchedDestinationsPageRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <MatchedDestinationsPage />
    </PageApp>
  );
}
