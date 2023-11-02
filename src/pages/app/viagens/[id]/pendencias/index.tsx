import { PageApp, TripPending } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Pendências da viagem";

export default function TripPendingRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <TripPending />
    </PageApp>
  );
}
