import { PageApp, TripPending } from "@/features";
import { useRouter } from "next/router";

const title = "Pendências da viagem";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <TripPending />
    </PageApp>
  );
}
